from __future__ import print_function

import os
import json
import base64
import psycopg2

pg_host = os.getenv('PGHOST', "172.17.0.1")
pg_user = os.getenv('PGUSER', "postgres")
pg_password = os.getenv('PGPASSWORD', "root")
pg_database = os.getenv('PGDATABASE', "db_server")
pg_port = os.getenv('PGPORT', "5432")

print('Loading function:' + pg_host)

def createOperation(row):
    sql = None

    operation = row["operation"]
    if operation == "insert":
        keys = []
        pairs = []
        for key, value in row["payload"].iteritems():
            keys.append(key)
            if type(value) is object:
                pairs.append("'" + json.dumps(value) + "'")
            elif type(value) is unicode:
                pairs.append("'" + value + "'")
            else:
                pairs.append(str(value))

        columns = ','.join(keys)
        values = ','.join(pairs)

        sql = "INSERT INTO " + row["table"] + " (" + columns + ") VALUES (" + values + ")"

    elif operation == "update":
        pairs = []
        for key, value in row["payload"].iteritems():
            if key == "id":
                continue

            if type(value) is object:
                pairs.append(key + "='" + json.dumps(value) + "'")
            elif type(value) is unicode:
                pairs.append(key + "='" + value + "'")
            else:
                pairs.append(key + "=" + str(value))

        values = ','.join(pairs)
        payload_id = row["payload"]["id"]

        sql = "UPDATE " + row["table"] + " SET " + values + " WHERE id=" + str(payload_id)

    elif operation == "delete":
        payload_id = row["payload"]["id"]

        sql = "DELETE FROM " + row["table"] + " WHERE id=" + str(payload_id)

    return sql


pg_conn = psycopg2.connect("user='" + pg_user + "' \
                    host='" + pg_host + "' password='" + pg_password + "' dbname='" + pg_database + "' port=" + pg_port)

print("Connection done: " + pg_database)

Records = [{
    "table": "table_core_msisdns",
    "timestamp": 1503171224178,
    "operation": "insert",
    "payload": {
        "id": 37699,
        "membership_no": "Z-1534328463-1",
        "msisdn": "1913263343"
    }
}, {
    "table": "table_core_msisdns",
    "timestamp": 1503171224178,
    "operation": "update",
    "payload": {
        "id": 37699,
        "membership_no": "Z-1534328464-1",
        "msisdn": "1913263343"
    }
}, {
    "table": "table_core_msisdns",
    "timestamp": 1503171224178,
    "operation": "delete",
    "payload": {
        "id": 37699
    }
}]

for record in Records:
    payload = json.dumps(record)
    print("Decoded payload: " + payload)

    row = json.loads(payload)
    sql = createOperation(row)
    if sql is not None:
        print(sql)
        try:
            cur = pg_conn.cursor()
            cur.execute(sql)
            cur.close()
            pg_conn.commit()
            print("Succeed")
        except Exception as ex:
            pg_conn.rollback()
            print(ex.message)
