'use strict';

var fs = require('fs');

module.exports = {
    production: 'production',
    development: 'development',
    environment: process.env.NODE_ENV,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
    stream: process.env.DB_PORT,
    aws_access_key: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    getSyncTableList: function () {
        var filename = process.env.SYNC_TABLE_LIST || 'sync_table_list';
        var sync_table_list_file = this.environment + '/' + filename;
        var obj = JSON.parse(fs.readFileSync(sync_table_list_file, 'utf8'));
    }
};