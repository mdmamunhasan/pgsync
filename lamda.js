"use strict";
require("dotenv").config({path: __dirname + "/env.secrets"});
var when = require("when");
var recordHandler = require("./handlers/kinesisRecordHandler");
/**
 *    Does a basic validation of the event data
 * @param eventData
 * @return {*}
 */
function validateEventData(eventData) {
  if (!eventData.hasOwnProperty("Records") || !Array.isArray(eventData["Records"])) {
    console.error("Event data is not what we expect, got: %s", JSON.stringify(eventData));
    return new Error("Invalid event data");
  }
  if (!eventData["Records"][0].hasOwnProperty("kinesis")) {
    console.error("Seems event is not from a kinesis stream, got: %s", JSON.stringify(eventData));
    return new Error("Not a kinesis event");
  }
  return true;
}

/**
 *  Wraps the promise to be able to use when.all
 * @param kinesisRecord
 * @return {Promise}
 */
function handleKinesisRecord(kinesisRecord) {
  return recordHandler(kinesisRecord)
    .then(function (handlingResult) {
      return {
        state: "fulfilled",
        value: handlingResult
      }
    })
    .catch(function (handlingError) {
      return {
        state: "rejected",
        reason: handlingError
      }
    })
}

/**
 *  This is THE lambda function handler
 * @param event
 * @param context
 * @param callback
 * @return {*}
 */
function executionHandler(event, context, callback) {
  var eventValidation = validateEventData(event);
  if (eventValidation !== true) {
    return callback(eventValidation);
  }
  //Looks like a proper data to check..
  console.info("%s will handle %s kinesis image records", __filename, event["Records"].length);
  var promiseArray = [];
  event["Records"].forEach(function (kinesisRecord) {
    promiseArray.push(handleKinesisRecord(kinesisRecord));
  });
  when.all(promiseArray)
    .then(function (processResult) {
      var successfullyProcessed = [];
      processResult.forEach(function (handlerResult) {
        if (handlerResult.state == "rejected") {
          console.error("There was an error while handing record, reason: %s", JSON.stringify(handlerResult.reason));
        } else if (handlerResult.state == "fulfilled") {
          console.info("Successfully handled record with response: %s", JSON.stringify(handlerResult.value));
          successfullyProcessed.push(handlerResult.value);
        }
      });
      callback(null, successfullyProcessed);
    })
    .catch(function (processError) {
      var executionError = new Error(processError.toString());
      callback(executionError);
    });
}

exports.lambdaHandler = executionHandler;
