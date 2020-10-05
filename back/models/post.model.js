module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    author: {
      type: Sequelize.STRING
    }
  });

  return Post;
};