var config = require('../config/config');
var pg = require('pg');

// PostGreSql Connection

const Client = pg.Client;

const client = new Client(config.getDBConfig());
client.connect();

// Test Start
describe('msisdns', function () {
    describe('#insert()', function () {
        it('should insert without error', function (done) {
            var msisdn = '1913263346';
            const text = "INSERT INTO msisdns (membership_no,msisdn) VALUES($1, $2)";
            const values = ['Z-' + msisdn + '-1', msisdn];
            client.query(text, values, function (err, res) {
                if (err) {
                    done(err.stack);
                } else {
                    done();
                    describe('#update()', function () {
                        it('should update without error', function (done) {
                            const text = "UPDATE msisdns SET membership_no='Z-1534328463-1' WHERE msisdn='" + msisdn + "'";
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



