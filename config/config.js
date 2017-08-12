'use strict';

var fs = require('fs');

module.exports = {
    production: 'production',
    development: 'development',
    environment: process.env.NODE_ENV || this.development,
    db_host: process.env.DB_HOST || "172.17.0.1",
    db_name: process.env.DB_NAME || "db_local",
    db_user: process.env.DB_USER || "postgres",
    db_pass: process.env.DB_PASSWORD || "root",
    db_port: process.env.DB_PORT || 5432,
    stream: process.env.STREAM,
    aws_access_key: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    getSyncTableList: function () {
        var filename = process.env.SYNC_TABLE_LIST || 'sync_table_list';
        var sync_table_list_file = this.environment + '/' + filename;
        var sync_table_list = JSON.parse(fs.readFileSync(sync_table_list_file, 'utf8'));
        return sync_table_list;
    }
};