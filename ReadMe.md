## Requirements

1. NodeJs
2. PostgreSql
3. Kinesis
4. Docker
5. Lamda
6. Apache Spark

## Installation

1. Create a database named db_local
2. Execute the db.sql to create necessary table named members
3. Execute the trigger in trigger.sql
4. `git clone https://github.com/comoyo/pgsync.git` 
5. Within root `npm install`
6. Install docker
7. Now create a startdev.sh bash file in the root - for example

```bash
#!/usr/bin/env bash

docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker kill
docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker rm

docker run -d --name  pgsync -p 8001:80 -e NODE_ENV='development' -e DB_NAME='core' -e STREAM_NAME='pgsync' -e PGHOST='tonic-core-db.ckvp0ck3llgr.ap-southeast-1.rds.amazonaws.com' -e PGUSER="tcapi_admin" -e PGPASSWORD="SomeSecretPassword" -e PGPORT=5432 -e PGDATABASE="tonic_core" -e AWS_ACCESS_KEY_ID='[YOUR AWS_ACCESS_KEY_ID]' -e AWS_SECRET_ACCESS_KEY='[YOUR AWS_SECRET_ACCESS_KEY]' -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd):/app mmnhsn/pgsync
```
8. Now execute the bash file using ```bash startdev.sh```
9. Then enter docker container pgsync by ```docker exec -it pgsync bash``` 
10. And within docker container run ```node trigger.js``` which will create necessary triggers in the database for the tables listed in config/development/sync_table_list.json
11. Finally check your setup by run ```npm test``` within container. If evrything changed data passed then data passed to kinesis.
12. Follow the same process for NODE_ENV='production' also

## Lamda Function

Format for insert payload

    {
        "table": "msisdns",
        "INSERT": {
            "id": 27,
            "membership_no": "Z-1913263343-1",
            "msisdn": "1913263343"
        }
    }
    
modified for kinesis
    
    {
        "table": "table_core_msisdns",
        "timestamp": 1503171224170,
        "operation": "insert",
        "payload": {
            "id": 37699,
            "membership_no": "Z-1913263343-1",
            "msisdn": "1913263343"
        }
    }
    
Format for update payload

    {
        "table": "table_core_msisdns",
        "timestamp": 1503171224178,
        "operation": "update",
        "payload": {
            "id": 37699,
            "membership_no": "Z-1534328463-1",
            "msisdn": "1913263343"
        }
    }
    
Format for delete payload

    {
        "table": "table_core_msisdns",
        "timestamp": 1503171224188,
        "operation": "delete",
        "payload": {
            "id": 37699
        }
    }
    
We have build the function using two language. But the python one works well.
    
### pyPgSync: Python

The directory pyPgSync contains lamda function. Zip it internal content not the folder and upload in aws lamda.

It uses the following environmental variables: 

PGHOST=[Database Host]<br/>
PGUSER=[Database User]<br/>
PGPASSWORD=[Database Password]<br/>
PGDATABASE=[Database Name]<br/>
PGPORT=[Database Port]<br/> 

To test it in local execute 

    python lmdtest.py
    
### ndPgSync: NodeJS

The directory pgSyncLamda contains lamda function. Zip it internal content not the folder and upload in aws lamda.

The zip must contains following files and directory:

1. node_modules
2. index.js
3. helper.js
4. .env
5. package.json

.env must set follwing environmental variables

PGHOST=[Database Host]<br/>
PGUSER=[Database User]<br/>
PGPASSWORD=[Database Password]<br/>
PGDATABASE=[Database Name]<br/>
PGPORT=[Database Port]<br/>

To test it in local execute 

    node lmdtest.js