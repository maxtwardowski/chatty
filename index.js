const express = require('express');
const app = express();

var port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chatty_db", { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

var User = mongoose.model("User", userSchema);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});