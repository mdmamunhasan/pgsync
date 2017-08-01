var pg = require('pg');

pg.connect("postgres://postgres:root@127.0.0.1:5432/db_local", function (err, client) {
    if (err) {
        console.log(err);
    }
    client.on('notification', function (msg) {
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
