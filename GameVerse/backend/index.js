const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const gameLogic = require('./game-logic')
const bodyParser = require("body-parser");
const socketio = require('socket.io');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const routes = require("./routes/route");
const URI = process.env.DB_URI

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(routes);


const httpServer = app.listen(port, () => { console.log(`Server listening on port ${port}`) });
const io = socketio(httpServer,{
  cors: {
    origin: "*",
    methods: '*',
    credentials: true
  }
})

io.on('connection', client => {
  gameLogic.initializeGame(io, client)
})

