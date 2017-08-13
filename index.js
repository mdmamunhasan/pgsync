var config = require('./config/config');
var AWS = require('aws-sdk');
var pg = require('pg');

const Client = pg.Client;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-1"
});

var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

const client = new Client(config.getDBConfig());
client.connect();

var recordData = [];

client.on('notification', function (msg) {
    console.log("*========*");
    if (msg.name === 'notification' && msg.channel === 'table_update') {
        var pl = JSON.parse(msg.payload);
        console.log("*========*");

        var record = {
            Data: JSON.stringify({
                application: "core",
                timestamp: Date.now(),
                payload: pl
            }),
            PartitionKey: 'partition-1'
        };
        recordData.push(record);

        console.log(record)

        kinesis.putRecords({
            Records: recordData,
            StreamName: config.stream_name
        }, function (err, data) {
            if (err) {
                console.error(err);
            }
            else {
                recordData = [];
            }
        });

        console.log("-========-");
    }
});

client.query("LISTEN table_update");
