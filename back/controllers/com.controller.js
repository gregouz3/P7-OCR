const fs = require("fs");

const db = require("../models");
const Post = db.posts;
const Com = db.coms;
const User = db.users;

const Op = db.Sequelize.Op;

exports.createComment = (req, res) => { 

  const com = {
    postId: req.params.id,
    userId: req.body.userId,
    content: req.body.content,
    author: req.body.author,
  }

  // Save Tutorial in the database
  Com.createComment(com)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Post."
    });
  });
};


exports.getComments = (req, res) => {
  let postId = req.params.id;
  var condition = postId ? { postId: { [Op.like]: `%${postId}%` } } : null;
  Com.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Com.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
  
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Com.update(req.body, {
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
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Com.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Com.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} coms were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
