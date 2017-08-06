var pg = require('pg');

var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "AKIAJFDJF2NLFLHTWFPA",
    secretAccessKey: "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",
    region: "ap-southeast-1"
});

var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

pg.connect("postgres://postgres:root@127.0.0.1:5432/db_local", function (err, client) {
    if (err) {
        console.log(err);
    }
    client.on('notification', function (msg) {
        if (msg.name === 'notification' && msg.channel === 'table_update') {
            var pl = JSON.parse(msg.payload);
            console.log("*========*");
            Object.keys(pl).forEach(function (key) {
                console.log(key, pl[key]);
            });
            kinesis.addTagsToStream("ok", function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });
            console.log("-========-");
        }
    });

    client.query("LISTEN table_update");
});
