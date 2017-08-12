var config = require('./config/config');
var pg = require('pg');

const Pool = pg.Pool;
const Client = pg.Client;

const client = new Client({
    user: config.db_user,
    host: config.db_host,
    database: config.db_name,
    password: config.db_pass,
    port: config.db_port
});
client.connect();