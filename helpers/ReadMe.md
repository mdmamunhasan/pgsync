## Requirements

1. NodeJs
2. PostgreSql
3. Apache Kafka / Kinesis & Lamda
4. Apache Spark

## Installation

1. Create a database named db_local
2. Execute the db.sql to create necessary table named members
3. Execute the trigger in trigger.sql
4. `git clone https://github.com/mdmamunhasan/pgsync.git` 
5. Within root `npm install`
6. Install docker
7. Now create a startdev.sh bash file in the root - for example

```bash
#!/usr/bin/env bash

docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker kill
docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker rm

docker run -d --name  pgsync -p 8001:80 -e NODE_ENV='development' -e APP_NAME='core' -e STREAM_NAME='pgsync' -e PGHOST='tonic-core-db.ckvp0ck3llgr.ap-southeast-1.rds.amazonaws.com' -e PGUSER="tcapi_admin" -e PGPASSWORD="SomeSecretPassword" -e PGPORT=5432 -e PGDATABASE="tonic_core" -e AWS_ACCESS_KEY_ID='[YOUR AWS_ACCESS_KEY_ID]' -e AWS_SECRET_ACCESS_KEY='[YOUR AWS_SECRET_ACCESS_KEY]' -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd):/app mmnhsn/pgsync
```
8. Now execute the bash file using ```bash startdev.sh```
9. Then enter docker container pgsync by ```docker exec -it pgsync bash``` 
10. And within docker container run ```node trigger.js``` which will create necessary triggers in the database for the tables listed in config/development/sync_table_list.json
11. Finally check your setup by run ```npm test``` within container. If evrything changed data passed then data passed to kinesis.
12. Follow the same process for NODE_ENV='production' also and create a start.sh file.

## Kafka Setup

1. Initialize Zookeeper 
    
    `bin/zookeeper-server-start.sh config/zookeeper.properties`
    
2. Initialize Kafka 

    `bin/kafka-server-start.sh config/server.properties`
    
3. Create Topic

    `bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic topictest`
    
3. Command line Producer

    `bin/kafka-console-producer.sh --broker-list localhost:9092 --topic topictest`
    
4. Command line Consumer

    `bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic topictest --from-beginning`
    
5. Clone Spark

    `https://github.com/apache/spark.git`
    
6. Set SPARK_HOME path

    `export SPARK_HOME=[spark root directory]`

7. Start Spark Cluster

    `./sbin/start-slave.sh [host:port]`
    
8. Start Stream Processing

    `./consumer.sh`
