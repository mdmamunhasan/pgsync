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
    describe('#insert()', function () {
        it('should insert without error', function (done) {
            var msisdn = '8801913263343';
            const text = "INSERT INTO msisdns (membership_no,msisdn) VALUES($1, $2)";
            const values = ['Z-' + msisdn + '-1', msisdn];
            client.query(text, values, function (err, res) {
                if (err) {
                    done(err.stack);
                } else {
                    done();
                    describe('#update()', function () {
                        it('should update without error', function (done) {
                            const text = "UPDATE msisdns SET membership_no='8801534328463' WHERE msisdn='" + msisdn + "'";
                            client.query(text, function (err, res) {
                                if (err) {
                                    done(err.stack);
                                } else {
                                    done();
                                    describe('#delete()', function () {
                                        it('should delete without error', function (done) {
                                            const text = "DELETE FROM msisdns WHERE msisdn='" + msisdn + "'";
                                            client.query(text, function (err, res) {
                                                if (err) {
                                                    done(err.stack);
                                                } else {
                                                    done();
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        });
                    });
                }
            });
        });
    });
});


