const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const User = require("./models/user");
const uuid = require("uuid/v4");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const AuthController = require("./controllers/authentication");
const ChatController = require("./controllers/chat");

const port = 3000;

var authRequired = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(403).json("You're NOT authenticated!");
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    genid: req => {
      return uuid();
    },
    store: new FileStore(),
    secret: "BARDZOTAJEMNICZYKODZIX",
    resave: false,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      // USER NOT PRESENT IN DB
      if (!user) {
        return done(null, false, { message: "Invalid credentials!" });
      }
      // WRONG PASSWORD
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Invalid credentials!" });
      }
      // POSITIVE SCENARIO
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (user._id == id) {
      done(null, user);
    } else {
      done(err, false);
    }
  });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

mongoose.connect(
  "mongodb://localhost:27017/chattydb",
  { useNewUrlParser: true }
);

mongoose.set("useCreateIndex", true);

app.post("/login", AuthController.authenticateUser);

app.post("/logout", authRequired, AuthController.logoutUser);

io.on("connection", socket => {

  socket.on('SUBSCRIBE', room => {
    socket.join(room);
  });

  socket.on("SEND_MESSAGE", data => {
    io.sockets.in(data.conversationId).emit('MESSAGE', {
      message: data.message,
      username: data.username
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/users", AuthController.newUser);

app.get("/users", AuthController.getUser);

app.get("/users/all", authRequired, (req, res, next) => {
  User
    .find({'username':{$ne: req.user.username}})
    .exec((err, users) => {
      if (err) return next(err);
      res.status(200).json({ users });
      return next();
    })
});

// Sending replies
app.post("/chat/:convId", authRequired, ChatController.sendReply);

// Retrieving a list of all the conversations (without messages!)
app.get("/chat", authRequired, ChatController.getAllConversations);

// Retrieving a particular conversation (with messages!)
app.get("/chat/:convId", authRequired, ChatController.getConversation);

// New conversation
app.post("/chat/conv/new/", authRequired, ChatController.newConversation);

// just for development purposes
app.get("/protected", authRequired, (req, res) => {
  console.log(req.user)
  res.send("PROTECTED");
});

app.get("/unprotected", (req, res) => {
  res.send("UNPROTECTED");
});

app.post("/showmedat", (req, res) => {
  console.log(req.body);
  res.send("hehehhe");
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});
