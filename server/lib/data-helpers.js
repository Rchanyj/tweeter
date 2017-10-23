"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to mongo db:
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function (err, tweet) {
        callback(null, true);
      });
    },

    // Get all tweets in mongo db, sorted by newest first:
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    }

/* Update likes; find matching obj ID, update likes */
    updateLikes: function(tweetId) {
      var tweet = db.collection("tweets").find(ObjectId(tweetId));
      var likes = tweet.likes;
      if (tweet.likes === 0) {
        tweet.likes = 1;
      } else {
        tweet.likes = 0;
      };
    }
  };
}