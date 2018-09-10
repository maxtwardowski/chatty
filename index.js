const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const User = require('./models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chattydb", { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.username = "Anonymous";

  socket.on('chat message', data => {
    io.emit('chat message', { message: data.message, username: socket.username });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post("/users", (req, res, next) => {
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

server.listen(port, () => {
  console.log("Server listening on port " + port);
});