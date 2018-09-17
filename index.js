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

const port = 3000;

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

app.get("/", (req, res) => {
  res.send(`<h1>We home dude</h1>`);
});

app.get("/login", (req, res) => {
  res.send(`You got the login page!\n`);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    req.login(user, err => {
      if (err) {
        return res.send("Authentication error - invalid credentials.\n");
      }
      return res.send("Successfully authenticated!\n");
    });
  })(req, res, next);
});

app.post("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    // The response should indicate that the user is no longer authenticated.
    return res.send({
      authenticated: req.isAuthenticated()
    });
  });
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.username = "Anonymous";

  socket.on("chat message", data => {
    io.emit("chat message", {
      message: data.message,
      username: socket.username
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/users", (req, res, next) => {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error("Passwords do not match.");
    err.status = 400;
    return next(err);
  }
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };
    User.create(userData, (err, user) => {
      if (err) {
        return next(err);
      } else {
        res.send({
          message: "User saved!"
        });
      }
    });
  } else {
    var error = new Error("All fields need to be filled");
    error.status = 400;
    return next(error);
  }
});

app.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You're authenticated!\n");
  } else {
    res.send("You're NOT authenticated");
  }
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});
