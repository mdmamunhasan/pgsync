// Configure Credentials to use Cognito
var AWS = require('aws-sdk');


AWS.config.region = 'us-east-1';
// We're going to partition kinesis records based on an identity.
// We need to get credentials first, then attach our event listeners.

AWS.config.credentials.get(function (err) {
    // attach event listener
    if (err) {
        alert('Error retrieving credentials.');
        console.error(err);
        return;
    }
    // create kinesis client once
    var kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02'
    });
    var recordData = [];


    var record = {
        Data: JSON.stringify({
            blog: 'asdasd-tess',
            time: new Date()
        }),
        PartitionKey: 'partition-1'
    };
    recordData.push(record);

    console.log(record)

    kinesis.putRecords({
        Records: recordData,
        StreamName: 'test_kinesis_forjs'
    }, function (err, data) {
        if (err) {
            console.error(err);
        }
    });


});
