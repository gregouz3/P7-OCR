const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();
var bcrypt = require("bcryptjs");

const db = require("./models");
const User = db.user;
const Post = db.posts;
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({force: true}).then(() => {
  console.log('Resync Db...');
  User.create({
    username: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('isAdmin', 8),
    isAdmin: 1
  })
  Post.create({
    userId: 1,
    title: 'Premier post',
    description: 'Bonjour à tous et à toutes ! ',
    author: 'admin',
  
  });
  
  
});

require('./routes/auth.routes')(app);
require('./routes/post.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});