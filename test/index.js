var config = require('../config/config');
var assert = require('assert');
var pg = require('pg');

const Client = pg.Client;

const client = new Client(config.getDBConfig());
client.connect();

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('msisdns', function () {
    describe('#update()', function () {
        it('should update without error', function (done) {
            const text = "UPDATE msisdns SET msisdn='8811711223171' WHERE id=176;";
            client.query(text, function (err, res) {
                if (err) {
                    done(err.stack);
                } else {
                    done();
                }
            });
        });
    });
});


