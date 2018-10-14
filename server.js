
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static(__dirname + "/client/public"));
}


let apiRoute = require("./routes/route.js");
app.use("/", apiRoute);

const db = process.env.MONGODB_URI || "mongodb://localhost/nyt-react";
mongoose.connect(db, function(error) {

  if (error) {
    console.error(error);
  }

  else {
    console.log("Database connected successfull!");
  }
});


app.listen(PORT, function() {
  console.log(`Server started on port at ${PORT}!`);
});
