#!/usr/bin/env bash
/usr/local/spark/bin/spark-submit \
    --packages org.apache.spark:spark-streaming-kafka-0-8_2.11:2.1.1 \
      direct_processor.py \
      localhost:9092 testtopic