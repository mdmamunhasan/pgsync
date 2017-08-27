'use strict';

module.exports = {
    createOperation: function (row) {
        var operation = row.operation, sql, values, payload_id;

        switch (operation) {
            case "insert":
                values = Object.keys(row.payload).map(function (key) {
                    var value;
                    switch (typeof(row.payload[key])) {
                        case 'number':
                            value = row.payload[key];
                            break;
                        case 'string':
                            value = "'" + row.payload[key] + "'";
                            break;
                        default:
                            value = "'" + JSON.stringify(row.payload[key]) + "'";
                            break;
                    }
                    return value;
                }).join(',');
                sql = "INSERT INTO " + row.table + " (" + Object.keys(row.payload).join(',') + ") VALUES (" + values + ")";
                break;
            case "update":
                payload_id = row.payload.id;
                delete row.payload["id"];
                values = Object.keys(row.payload).map(function (key) {
                    var value;
                    switch (typeof(row.payload[key])) {
                        case 'number':
                            value = row.payload[key];
                            break;
                        case 'string':
                            value = "'" + row.payload[key] + "'";
                            break;
                        default:
                            value = "'" + JSON.stringify(row.payload[key]) + "'";
                            break;
                    }
                    return key + "=" + value;
                }).join(', ');
                sql = "UPDATE " + row.table + " SET " + values + " WHERE id=" + payload_id;
                break;
            case "delete":
                payload_id = row.payload.id;
                sql = "DELETE FROM " + row.table + " WHERE id=" + payload_id;
                break;
            default:
                console.log(operation);
        }

        return sql;
    }
}

