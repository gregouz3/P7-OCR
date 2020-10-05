module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    poste: {
      type: Sequelize.STRING
    },
    imgUrl: {
      type: Sequelize.STRING
    }
  });

  return User;
};