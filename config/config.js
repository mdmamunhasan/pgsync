'use strict';

var fs = require('fs');

module.exports = {
    production: 'production',
    development: 'development',
    environment: process.env.NODE_ENV || 'development',
    app_db_name: process.env.DB_NAME || 'core',
    stream_name: process.env.STREAM_NAME || 'pgsync',
    aws_access_key: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    getSyncTableList: function () {
        var filename = 'sync_table_list_' + this.app_db_name;
        var sync_table_list_file = __dirname + '/' + this.environment + '/' + filename + '.json';
        if (fs.existsSync(sync_table_list_file)) {
            console.log(sync_table_list_file);
            var sync_table_list = JSON.parse(fs.readFileSync(sync_table_list_file, 'utf8'));
            return sync_table_list;
        }
        return false;
    },
    getDBConfig: function (is_central) {
        var filename = 'db_config';
        var app_db_name = this.app_db_name;
        if(app_db_name.length > 0 && !is_central){
            filename = filename + '_' + app_db_name;
        }
        var db_config_file = __dirname + '/' + this.environment + '/' + filename + '.json';

        var db_config;
        if (fs.existsSync(db_config_file)) {
            console.log(db_config_file);
            db_config = JSON.parse(fs.readFileSync(db_config_file, 'utf8'));
        }
        else{
            db_config = {
                user: process.env.PGUSER || "postgres",
                host: process.env.PGHOST || "172.17.0.1",
                database: process.env.PGDATABASE || "db_local",
                password: process.env.PGPASSWORD || "root",
                port: process.env.PGPORT || 5432
            }
        }

        return db_config;
    }
};