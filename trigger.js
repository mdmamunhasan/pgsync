var config = require('./config/config');
var pg = require('pg');

const Client = pg.Client;

const client = new Client();
client.connect();

var sync_table_list = config.getSyncTableList();
var trigger_actions = ["insert", "update", "delete"];

sync_table_list.forEach(function (table) {
    var drop_trigger = 'DROP TRIGGER $1 ON $2';
    var ctreate_trigger = "CREATE TRIGGER $1 AFTER INSERT ON $2 FOR EACH ROW EXECUTE PROCEDURE table_update_notify()";
    trigger_actions.forEach(function (trigger) {
        var trigger_values = [table + '_notify_' + trigger, table];
        client.query(drop_trigger, trigger_values, function (err, res) {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(trigger_values[0] + " dropped");
                client.query(ctreate_trigger, trigger_values, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    } else {
                        console.log(trigger_values[0] + " created");
                    }
                });
            }
        });
    });
});