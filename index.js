var config = require('./config/config');
var AWS = require('aws-sdk');
var pg = require('pg');

const Pool = pg.Pool;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-1"
});

var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

const pool = new Pool({
    user: config.db_user,
    host: config.db_host,
    database: config.db_name,
    password: config.db_pass,
    port: config.db_port
});
pool.connect();

pool.on('notification', function (msg) {
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

pool.query("LISTEN table_update");
