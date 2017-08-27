'use strict';

require('dotenv').config();
var helper = require('./helper');
var async = require('async');
var pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

var executions = [];
executions.push(function (next) {
    pool.connect();
    next();
});

exports.handler = function (event, context, callback) {
    if (event.hasOwnProperty("Records")) {
        console.log("Received event valid format.");

        event.Records.forEach(function (record) {
            // Kinesis data is base64 encoded so decode here
            var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
            console.log('Decoded payload:', payload);

            var row, sql;

            try {
                row = JSON.parse(payload);
            }
            catch (ex) {
                console.log(ex.message);
            }

            if (row && row.hasOwnProperty("operation")) {
                sql = helper.createOperation(row);
            }

            if (sql) {
                executions.push(function (next) {
                    pool.query(sql, function (err, res) {
                        if (err) {
                            console.log("Query failed:", err.stack);
                        } else {
                            console.log("Query Succeeded:", sql);
                        }
                        next();
                    });
                });
                callback(null, sql);
            }
            else {
                console.log("No records processed.");
            }
        });

        async.waterfall(executions, function (err, result) {
            executions = [];
            console.log("All records are processed.");
            //callback(null, 'All records are processed');
        });
    }
    else {
        console.log("Received event invalid format:", JSON.stringify(event, null, 2));
        callback(null, 'Received event invalid format');
    }
};
