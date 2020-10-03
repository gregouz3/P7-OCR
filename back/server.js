const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const mysql= require("mysql");

const dotenv = require("dotenv");

dotenv.config({ path: './.env' });


const app = express();



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to greg serv" });
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password:  process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect( (error) => {
  if (error)
    console.log(error);
  console.log("mysql is connected...")
} )

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});