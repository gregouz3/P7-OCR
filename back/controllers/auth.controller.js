const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Post = db.posts;
const Com = db.coms;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: 0
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
          accessToken: token,
          isAdmin: user.isAdmin
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.deleteAccount = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id}
    
  })
  Post.destroy({
    where: { userId: id}
  })
  
    Com.destroy({
     where : {userId: id}
      
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rm ok"
        });
      } else {
        res.send({
          message: `Cannot delete ${id}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

exports.mvAccount = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
  
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
  
};
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {isAdmin : 0},
    truncate: false
  })

  Post.destroy({
    where: { }
  })
  
    Com.destroy({
     where : {}
      
    })
    .then(nums => {
      res.send({ message: `${nums} posts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};