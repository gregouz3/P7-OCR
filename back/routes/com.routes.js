module.exports = app => {
  const coms = require("../controllers/com.controller.js");
  
  var router = require("express").Router();
  router.post('/:id/comments',  coms.createComment);

  // Retrieve a single Tutorial with id
  router.get("/:id/comments/:id",coms.findOne);

  // Update a Tutorial with id
  router.put("/:id/comments/:id",coms.update);

  // Delete a Tutorial with id
  router.delete("/:id/comments/:id", coms.delete);

  // Delete all Tutorials
  router.delete("/:id/comments", coms.deleteAll);
  router.get('/:id/comments', coms.getComments);



  app.use('/posts', router);
};