var config = require('./config/config');
var pg = require('pg');

const Client = pg.Client;

const client = new Client(config.getDBConfig());
client.connect();

var sync_table_list = config.getSyncTableList();
var trigger_actions = ["insert", "update", "delete"];

sync_table_list.forEach(function (table) {
    trigger_actions.forEach(function (trigger) {
        var trigger_name = table + '_notify_' + trigger;
        var drop_trigger_sql = "DROP TRIGGER IF EXISTS " + trigger_name + " ON " + table;
        var create_trigger_sql = "CREATE TRIGGER " + trigger_name + " AFTER " + trigger + " ON " + table + " FOR EACH ROW EXECUTE PROCEDURE table_update_notify()";
        client.query(drop_trigger_sql, function (err, res) {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(trigger_name + " dropped");
                client.query(create_trigger_sql, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    } else {
                        console.log(trigger_name + " created");
                    }
                });
            }
        });
    });
});