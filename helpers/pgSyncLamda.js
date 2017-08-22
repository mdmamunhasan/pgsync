'use strict';

require('dotenv').config();

var async = require('async');
var pg = require('pg');

const Client = pg.Client;

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

client.connect();

exports.handler = function (event, context, callback) {
    if (event.hasOwnProperty("Records")) {
        event.Records.forEach(function (record) {
            // Kinesis data is base64 encoded so decode here
            const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
            console.log('Decoded payload:', payload);

            var row, sql, values, operation, payload_id;

            try {
                row = JSON.parse(payload);
            }
            catch (ex) {
                console.log(ex.message);
                return;
            }

            if (row && row.hasOwnProperty("operation")) {
                operation = row.operation;
                switch (operation) {
                    case "insert":
                        values = Object.keys(row.payload).map(function (key) {
                            var value;
                            switch (typeof(row.payload[key])) {
                                case 'number':
                                    value = row.payload[key];
                                    break;
                                case 'string':
                                    value = "'" + row.payload[key] + "'";
                                    break;
                                default:
                                    value = "'" + JSON.stringify(row.payload[key]) + "'";
                                    break;
                            }
                            return value;
                        }).join(',');
                        sql = "INSERT INTO " + row.table + " (" + Object.keys(row.payload).join(',') + ") VALUES (" + values + ")";
                        break;
                    case "update":
                        payload_id = row.payload.id;
                        delete row.payload["id"];
                        values = Object.keys(row.payload).map(function (key) {
                            var value;
                            switch (typeof(row.payload[key])) {
                                case 'number':
                                    value = row.payload[key];
                                    break;
                                case 'string':
                                    value = "'" + row.payload[key] + "'";
                                    break;
                                default:
                                    value = "'" + JSON.stringify(row.payload[key]) + "'";
                                    break;
                            }
                            return key + "=" + value;
                        }).join(', ');
                        sql = "UPDATE " + row.table + " SET " + values + " WHERE id=" + payload_id;
                        break;
                    case "delete":
                        payload_id = row.payload.id;
                        sql = "DELETE FROM " + row.table + " WHERE id=" + payload_id;
                        break;
                    default:
                        console.log(operation);
                }
            }

            if (sql) {
                console.log(sql);
                client.query(sql, function (err, res) {
                    if (err) {
                        console.log("query failed", err.stack);
                    } else {
                        console.log(operation + " succeeded");
                    }
                });
                callback(null, "Successfully processed " + event.Records.length.toString() + " records.");
            }
            else {
                callback(null, "No records processed.");
            }
        });
    }
    else {
        console.log('Received event:', JSON.stringify(event, null, 2));
        return;
    }
};