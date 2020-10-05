const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    poste: req.body.poste,
    password: bcrypt.hashSync(req.body.password, 8),
    imgUrl: req.body.imgUrl
  })
  if (User) {
        res.send({ message: "User was registered successfully!" })
  } 
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

 
      res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          poste: user.poste,
          imgUrl: user.imgUrl,
          accessToken: token

        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};