var config = require('../config/config');
var pg = require('pg');

const Client = pg.Client;

const client = new Client(config.getDBConfig(true));
client.connect();

var sync_table_list = config.getSyncTableList();
if(!sync_table_list){
    console.log("No table found!");
    return;
}

sync_table_list.forEach(function (table) {
    var rename_sql = "ALTER TABLE " + table + " RENAME TO table_" + config.app_db_name + '_' + table;
    client.query(rename_sql, function (err, res) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(table + " renamed");
        }
    });
});