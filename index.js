const express = require("express");
const amqp = require("amqplib");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const data = {
    title: "Six of Crows",
    author: "Leigh Burdugo",
  };

  sendData(data);

  res.status(200).json({
    message: "Hello from the server",
  });
});

var channel, connection; //global variables
async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("test-queue");
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data) {
  // send data to queue
  await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));

  // close the channel and connection
  //   await channel.close();
  //   await connection.close();
}

connectQueue();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server running at port " + PORT));
