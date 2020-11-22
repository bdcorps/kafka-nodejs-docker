const Kafka = require('node-rdkafka')

const producer = new Kafka.Producer({
  'metadata.broker.list': 'localhost:9092',
  dr_cb: true
})

const topicName = 'test'

producer.on('event.log', function (log) {
  console.log(log)
})

producer.on('event.error', function (err) {
  console.error('Error from producer')
  console.error(err)
})

let counter = 0
const maxMessages = 10

producer.on('delivery-report', function (err, report) {
  if (err) {
    return
  }
  console.log('delivery-report: ' + JSON.stringify(report))
  counter++
})

producer.on('ready', function (arg) {
  console.log('producer ready.' + JSON.stringify(arg))

  for (let i = 0; i < maxMessages; i++) {
    const value = Buffer.from('value-' + i)
    const key = 'key-' + i
    // if partition is set to -1, librdkafka will use the default partitioner
    const partition = -1
    const headers = [
      { header: 'header value' }
    ]

    producer.produce(topicName, partition, value, key, Date.now(), '', headers)
  }

  const pollLoop = setInterval(function () {
    producer.poll()
    if (counter === maxMessages) {
      clearInterval(pollLoop)
      producer.disconnect()
    }
  }, 1000)
})

producer.on('disconnected', function (arg) {
  console.log('producer disconnected. ' + JSON.stringify(arg))
})

producer.connect()
