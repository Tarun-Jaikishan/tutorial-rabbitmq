const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server running at port " + PORT));
