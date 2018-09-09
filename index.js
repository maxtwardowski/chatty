const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chattydb", { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

app.post("/", (req, res, next) => {

  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
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
  } else {
    var error = new Error('All fields need to be filled');
    error.status = 400;
    return next(error);
  }
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});