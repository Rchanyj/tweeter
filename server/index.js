"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const TWEETHOST     = "mongodb://localhost:27017/tweets";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connect to mongo database:

MongoClient.connect(TWEETHOST, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${TWEETHOST}`);
    throw err;
  }

  console.log(`Successfully connected to mongodb: ${TWEETHOST}`);

  //Connecting to other functions:

  const DataHelpers = require("./lib/data-helpers.js")(db);

  // Pass tweetsRoutes the the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});