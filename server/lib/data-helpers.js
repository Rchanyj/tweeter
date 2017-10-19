"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`; update this to mongo:
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function (err, tweet) {
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first; update this to mongo
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    }

  };
}
