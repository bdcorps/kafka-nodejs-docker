const Kafka = require('node-rdkafka')

const stream = Kafka.KafkaConsumer.createReadStream({
  'metadata.broker.list': 'localhost:9092',
  'group.id': 'librd-test',
  'socket.keepalive.enable': true,
  'enable.auto.commit': false
}, {}, {
  topics: 'test',
  waitInterval: 0,
  objectMode: false
})

stream.on('error', function (err) {
  if (err) console.log(err)
  process.exit(1)
})

stream
  .pipe(process.stdout)

stream.on('error', function (err) {
  console.log(err)
  process.exit(1)
})

stream.consumer.on('event.error', function (err) {
  console.log(err)
})