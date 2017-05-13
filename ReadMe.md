## Requirements

1. NodeJs
2. PostgreSql
3. Apache Kafka
4. Apache Spark

## Installation

1. Create a database named db_local
2. Execute the db.sql to create necessary table named members
3. Execute the trigger in trigger.sql
4. `git clone https://github.com/mdmamunhasan/pgsync.git` 
5. Within root `npm install`
6. `node index`
7. Now when you insert, update or delete any row in members table you can view notification in node console.

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