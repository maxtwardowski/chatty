const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chattydb", { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

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

userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model("User", userSchema);

app.post("/", (req, res, next) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    User.create(userData, (err, user) => {
      if (err) {
        return next(err);
      } else {
        res.send({
          'message': 'User saved!'
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});