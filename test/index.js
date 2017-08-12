var assert = require('assert');
var pg = require('pg');

const Client = pg.Client;

const client = new Client();
client.connect();

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('msisdns', function () {
    describe('#save()', function () {
        it('should save without error', function (done) {

            const text = 'INSERT INTO msisdns(id, email) VALUES($1, $2)';
            const values = [Date.now(), 'mamunthecoder@gmail.com'];

            client.query(text, values, function (err, res) {
                if (err) {
                    done(err.stack);
                } else {
                    done();
                }
            });
        });
    });
});


