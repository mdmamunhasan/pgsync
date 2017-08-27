var config = require('./config/config');
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.aws_access_key,
    secretAccessKey: config.aws_secret_key,
    region: "ap-southeast-1"
});

var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

var recordData = [{
    Data: JSON.stringify({
        "table": "table_core_msisdns",
        "timestamp": 1503171224178,
        "operation": "insert",
        "payload": {
            "id": 37698,
            "membership_no": "Z-1534328466-1",
            "msisdn": "1913263343"
        }
    }),
    PartitionKey: 'partition-1'
}];

kinesis.putRecords({
    Records: recordData,
    StreamName: config.stream_name
}, function (err, data) {
    if (err) {
        console.log("Error:", err);
    }
    else {
        console.log("Success:", data);
    }
});