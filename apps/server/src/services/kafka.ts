import { Kafka, KafkaJSDeleteGroupsError, Producer } from "kafkajs"
import path from "path"
import fs from "fs"
import db from "./prisma"

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

const consumeMessage = async () => {
    const consumer = kafka.consumer({ groupId: "default" })

    await consumer.connect()
    await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true })

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if(!message.value) return 

            console.log("Kafka broker consumed message")
            try {
                await db.message.create({
                    data: {
                        content: message.value?.toString(), 
                        username: ""
                    }
                })
            } catch (error) {
                console.log("Database write error")
                pause()
                setTimeout(() => {
                        consumer.resume([{topic: "MESSAGES"}])
                }, 60 * 1000)
            }
        }
    })

}

export { kafka, createProducer, produceMessage, consumeMessage }