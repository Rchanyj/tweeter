/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Test / driver code (temporary). Eventually will get this from the server.
  var tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  function createTweetElement(tweetData) {
    var tweet = $("<article>");
    var header = tweet.append("<header class='tweet-header'></header>");
    var message = tweet.append("<div class='tweet-message'><div>");
    var footer = tweet.append("<footer class='tweet-footer'></footer>");

    //Appending nodes inside main parents:
    header.append("<div class='handle'>${tweetData.user.handle}</div>");
    //header.append("<img class='avatar' src='')
    //tweet.(".tweet-header").appendClass("handle").appendChild(tweetData.user.handle);
    //tweet.(".tweet-header").appendClass("avatar").appendChild(src=tweetData.user.avatars.regular);
    //tweet.(".tweet-header").appendClass("display-name").appendChild(tweetData.user.name);
    return tweet;

  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make
  //sure it's got all the right elements, classes, etc.


})