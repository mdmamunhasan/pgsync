'use strict';

var config = require('./config/config');
var helper = require('./ndPgSync/helper');
var async = require('async');
var pg = require('pg');

const Pool = pg.Pool;

var pool = new Pool(config.getDBConfig(true)), executions = [];

executions.push(function (next) {
    pool.connect();
    next();
});

function lamda(callback) {
    var Records = [{
        "table": "table_core_msisdns",
        "timestamp": 1503171224178,
        "operation": "insert",
        "payload": {
            "id": 37699,
            "membership_no": "Z-1534328463-1",
            "msisdn": "1913263343"
        }
    }, {
        "table": "table_core_msisdns",
        "timestamp": 1503171224178,
        "operation": "update",
        "payload": {
            "id": 37699,
            "membership_no": "Z-1534328464-1",
            "msisdn": "1913263343"
        }
    }, {
        "table": "table_core_msisdns",
        "timestamp": 1503171224178,
        "operation": "delete",
        "payload": {
            "id": 37699
        }
    }];

    Records.forEach(function (row) {
        var sql;
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
        }
        else {
            console.log("No records processed.");
        }
    });

    async.waterfall(executions, function (err, result) {
        executions = [];
        callback(null, "All records are processed.");
    });
}

lamda(function (error, message) {
    console.log(error, message);
});
