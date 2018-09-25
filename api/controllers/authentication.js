const User = require("../models/user");
const passport = require("passport");

exports.getUser = (req, res) => {
  const userData = {
    _id: req.user._id,
    email: req.user.email,
    username: req.user.username
  }
  res.status(200).json(userData)
};

exports.newUser = (req, res, next) => {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error("Passwords do not match.");
    err.status = 401;
    return next(err);
  }
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };
    User.create(userData, (err, user) => {
      if (err) return next(err);
      res.status(200).json({ message: "User saved!" });
    });
  } else {
    var error = new Error("All fields need to be filled");
    error.status = 400;
    return next(error);
  }
};

exports.authenticateUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    req.login(user, err => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Authentication error - invalid credentials.\n" });
      }
      return res.status(200).json({ message: "Successfully authenticated!\n" });
    });
  })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      authenticated: req.isAuthenticated()
    });
  });
};
