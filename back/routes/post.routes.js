module.exports = app => {
  const posts = require("../controllers/post.controller.js");
  
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",  posts.create);
  router.post('/:id/comments',  posts.createComment);

  // Retrieve all Tutorials
  router.get("/", posts.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", posts.findOne);
  router.get("/:id/comments/:id",posts.findOneCom);

  // Update a Tutorial with id
  router.put("/:id", posts.update);
  router.put("/:id/comments/:id", posts.updateC);

  // Delete a Tutorial with id
  router.delete("/:id",  posts.delete);

  // Delete all Tutorials
  router.delete("/",  posts.deleteAll);
  // Retrieve a single Tutorial with id


  // Update a Tutorial with id

  // Delete a Tutorial with id
  router.delete("/:id/comments/:id", posts.deleteC);

  // Delete all Tutorials
  router.get('/:id/comments', posts.getComments);



  app.use('/posts', router);
};