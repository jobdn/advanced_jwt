const express = require("express");
const cors = require("cors");

const userController = require("./controllers/users");

const app = express();

const PORT = 7000;

app.use(cors());
app.get("/users", userController.users);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log("Server started on ", PORT);
    });
  } catch (error) {
    console.log("Error when app starts", error);
  }
}

start();
