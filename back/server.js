const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); //to access the files in public folder
app.use(fileUpload());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to greg serv" });
});

app.post('/upload', (req, res) => {

  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/../front/public/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
})

const db = require("./models");

db.sequelize.sync({force: true}).then(() => {
  console.log('Resync Db...');
});

require('./routes/auth.routes')(app);
require('./routes/post.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});