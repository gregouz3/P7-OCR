
module.exports = (sequelize, Sequelize) => {

  User = require("../models/user.model.js")(sequelize, Sequelize);
  const Post = sequelize.define("posts", {

    userId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
   
    author: {
      type: Sequelize.STRING,
    }

   

    

  });

  return Post;
};