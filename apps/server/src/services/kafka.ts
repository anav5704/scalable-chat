import { Kafka, KafkaJSDeleteGroupsError, Producer } from "kafkajs"
import path from "path"
import fs from "fs"

const kafka = new Kafka({
    brokers: ["kafka-scalable-ws-chat.a.aivencloud.com:10205"],
    ssl: {
        ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
    },
    sasl: {
        username: "avnadmin",
        password: process.env.KAFKA_PASSWD!,
        mechanism: "plain"
    }
})

let producer: null | Producer = null

const createProducer = async () => {
    if (producer) return producer

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer

    return producer

}

const produceMessage = async (message: string) => {
    const producer = await createProducer()

    await producer.send({
        messages: [{
            key: `message-${Date.now()}`, value: message
        }],
        topic: "MESSAGES"
    })

    return true
}

export { kafka, createProducer, produceMessage }