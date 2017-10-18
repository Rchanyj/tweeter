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
    return $("<article>", {
      "class": "tweet",
      html: [
        $("<header>", {
          "class": "tweet-header",
          html: [
            $("<div>", {
              "class": "handle",
              text: tweetData.user.handle
            }),
            $("<img>", {
              "class": "avatar",
               src: tweetData.user.avatars.regular
            }),
            $("<div>", {
              "class": "display-name",
              text: tweetData.user.name
            })
          ]
        }),
        $("<div>", {
          "class": "tweet-message",
          html: [
            $("<p>", {
              text: tweetData.content.text
            })
          ]
        }),
        $("<footer>", {
          "class": "tweet-footer",
          html: [
            $("<aside>", {
              "class": "interact",
              html: [
                $("<img>", {
                  "class": "flag",
                  src: "/images/flag.png"
                }),
                $("<img>", {
                  "class": "share",
                  src: "/images/share.png"
                }),
                $("<img>", {
                  "class": "like",
                  src: "/images/like.png"
                })
              ]
            }),
            $("<div>", {
              "class": "age",
              text: tweetData.created_at + " days ago"
            })
          ]
        })
      ]
    });
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweet-storage').append($tweet); // to add it to the page so we can make
  //sure it's got all the right elements, classes, etc.


})