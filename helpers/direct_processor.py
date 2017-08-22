"""
 Usage: direct_processor.py <broker_list> <topic>

 To run this on your local machine, you need to setup Kafka and create a producer first, see
 http://kafka.apache.org/documentation.html#quickstart

 and then run the command
    `$ /usr/local/spark/bin/spark-submit \
      --packages org.apache.spark:spark-streaming-kafka-0-8_2.11:2.1.1 \
      direct_processor.py \
      localhost:9092 testtopic`
"""
from __future__ import print_function

import sys
import json

from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: direct_processor.py <broker_list> <topic>", file=sys.stderr)
        exit(-1)

    sc = SparkContext(appName="PythonStreamingDirectKafkaMessage")
    ssc = StreamingContext(sc, 20)

    brokers, topic = sys.argv[1:]
    kvs = KafkaUtils.createDirectStream(ssc, [topic], {"metadata.broker.list": brokers})
    parsed = kvs.map(lambda (key, value): json.loads(value))
    parsed.pprint()

    ssc.start()
    ssc.awaitTermination()
