require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const corsConfig = require("./config/cors");
const { usersRouter, authRouter } = require("./routes");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);

async function start() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("Server started on ", PORT);
    });
  } catch (error) {
    console.log("Error when app starts", error);
  }
}

start();
