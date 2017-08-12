'use strict';
var fs = require('fs');

module.exports = {
    production: 'production',
    development: 'development',
    environment: process.env.NODE_ENV || 'development',
    db_host: process.env.PGHOST || "127.0.0.1",
    db_name: process.env.PGDATABASE || "db_local",
    db_user: process.env.PGUSER || "postgres",
    db_pass: process.env.PGPASSWORD || "root",
    db_port: process.env.PGPORT || 5432,
    stream: process.env.NODE_STREAM,
    aws_access_key: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    getSyncTableList: function () {
        var filename = process.env.SYNC_TABLE_LIST || 'sync_table_list';
        var sync_table_list_file = __dirname + '/' + this.environment + '/' + filename + '.json';
        console.log(sync_table_list_file);
        var sync_table_list = JSON.parse(fs.readFileSync(sync_table_list_file, 'utf8'));
        return sync_table_list;
    },
    getDBConfig: function () {
        var filename = process.env.SYNC_TABLE_LIST || 'db_config';
        var db_config_file = __dirname + '/' + this.environment + '/' + filename + '.json';
        console.log(db_config_file);
        var db_config = JSON.parse(fs.readFileSync(db_config_file, 'utf8'));
        return db_config;
    }
};