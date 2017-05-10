## Requirements

1. NodeJs
2. PostgreSql
3. Apache Kafka

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