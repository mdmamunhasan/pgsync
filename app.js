var config = require('./config/config');
var pg = require('pg');

var connection_url = "postgres://"+config.db_user+":"+config.db_pass+"@"+config.db_host+":"+config.db_port+"/"+config.db_name;
console.log(connection_url);
pg.connect(connection_url, function (err, client) {
    if (err) {
        console.log(err);
    }
    console.log(connection_url);
    client.on('notification', function (msg) {
        console.log(msg);
        if (msg.name === 'notification' && msg.channel === 'table_update') {
            var pl = JSON.parse(msg.payload);
            console.log("*========*");
            Object.keys(pl).forEach(function (key) {
                console.log(key, pl[key]);
            });
            console.log("-========-");
        }
    });
    client.query("LISTEN table_update");
});
