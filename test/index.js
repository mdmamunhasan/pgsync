var config = require('../config/config');
var assert = require('assert');
var pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool(config.getDBConfig());
pool.connect();

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
            const text = "UPDATE msisdns SET msisdn='8811711223171' WHERE id=176";
            pool.query(text, function (err, res) {
                if (err) {
                    done(err.stack);
                } else {
                    done();
                }
            });
        });
    });
});


