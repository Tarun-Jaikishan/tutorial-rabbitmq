const amqp = require("amqplib");
var channel, connection;
connectQueue(); // call the connect function

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("test-queue");

    channel.consume(
      "test-queue",
      (data) => {
        //   console.log(Buffer.from(data).toString());
        console.log(`${Buffer.from(data.content)}`);
        channel.ack(data);
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
  }
}
