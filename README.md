# Kafka Nodejs Docker Compose

- Run docker-compose 

## Producer
$ docker exec -it apache-kafka_kafka_1 bash

### To create a new topic named test
bash-4.4# kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1
--partitions 1 --topic test
 
### To start a producer
bash-4.4# kafka-console-producer.sh --broker-list localhost:9092 --topic test

## Consumer
$ docker exec -it apache-kafka_kafka_1 bash

### To start a consumer
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test
