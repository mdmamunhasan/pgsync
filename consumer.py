from __future__ import print_function

import os
import subprocess
from kafka import KafkaConsumer

spark_home = os.environ.get('SPARK_HOME','/usr/local/spark/')
print(spark_home)

consumer = KafkaConsumer('topictest', bootstrap_servers='localhost:9092')
for msg in consumer:
    print (msg)
    subprocess.call([spark_home + "bin/spark-submit", "--master", "local", "processor.py"])
