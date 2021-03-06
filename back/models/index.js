const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.posts = require("../models/post.model.js")(sequelize, Sequelize);
db.coms = require("../models/com.model.js")(sequelize, Sequelize);



db.posts.hasOne(db.coms, {
  onDelete: 
    'CASCADE',
  OnUpdate: 
  'CASCADE'
} );
db.coms.belongsTo(db.posts);

module.exports = db;