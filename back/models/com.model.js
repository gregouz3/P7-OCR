module.exports = (sequelize, Sequelize) => {
  User = require("../models/user.model.js")(sequelize, Sequelize);

  Post = require("../models/post.model.js")(sequelize, Sequelize);
  const Com = sequelize.define("coms", {
    userId: {
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
      references : {
        model: Post,
        key: 'id'
      }
    },
    content: {
      type: Sequelize.STRING,
    },
   
    author: {
      type: Sequelize.STRING,
    }
   

    

  });

  return Com;
};