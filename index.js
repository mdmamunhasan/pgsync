var config = require('./config/config');
var AWS = require('aws-sdk');
var pg = require('pg');

// AWS Kinesis

AWS.config.update({
    accessKeyId: config.aws_access_key,
    secretAccessKey: config.aws_secret_key,
    region: "ap-southeast-1"
});

var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

// PostGreSql Connection

const Client = pg.Client;

const client = new Client(config.getDBConfig());
client.connect();

// PostGreSql Notification

client.on('notification', function (msg) {
    var recordData = [];

    console.log("*========*");
    if (msg.name === 'notification' && msg.channel === 'table_update') {
        const pl = JSON.parse(msg.payload);
        console.log("*========*");

        if (typeof(pl) == "object" && "table" in pl) {
            var data = {
                table: "table_" + config.app_db_name + '_' + pl.table,
                timestamp: Date.now()
            };
            if ("INSERT" in pl) {
                data["operation"] = "insert";
                data["payload"] = pl.INSERT;
            }
            else if ("UPDATE" in pl) {
                data["operation"] = "update";
                data["payload"] = pl.UPDATE;
            }
            else if ("DELETE" in pl) {
                data["operation"] = "delete";
                data["payload"] = {
                    id: pl.DELETE
                };
            }
            else {
                data = false;
            }

            if (data) {
                var record = {
                    Data: JSON.stringify(data),
                    PartitionKey: 'partition-1'
                };
                recordData.push(record);
            }
        }

        if (recordData.length > 0) {
            kinesis.putRecords({
                Records: recordData,
                StreamName: config.stream_name
            }, function (err, data) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(recordData);
                    recordData = [];
                }
            });
        }

        console.log("-========-");
    }
});

client.query("LISTEN table_update");
