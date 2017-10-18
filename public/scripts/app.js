/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    // Test / driver code (temporary). Eventually will get this from the server.
  var data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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

  function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      $("#tweet-storage").prepend($tweet);
    });
  }


  //New test code:
  //  renderTweets(data);

    //var $tweet = createTweetElement(tweetData);

    // Test / driver code (temporary)
   // console.log($tweet); // to see what it looks like
   // $('#tweet-storage').append($tweet); // to add it to the page so we can make
    //sure it's got all the right elements, classes, etc.


  //Fetch tweets from /tweets page
  function loadTweets() {
    $.ajax({
      method: "get",
      url: "/tweets"
    }).done(function(tweets) {
      renderTweets(tweets);
    });
  }



  //Submit tweets
  $(".container form").on("submit", function(event) {
    //Prevent default submit behaviour
    event.preventDefault();
    //submit request using Ajax
    var tweetform = this;
  //Error checks:
  //If empty, return empty tweet error message
  //If char length >140, error message
    var tweetEntry = $(".new-tweet textarea").val();
    if (tweetEntry.length === 0) {
      return alert("Nothing to tweet! Don't be shy!");
    } else if (tweetEntry.length > 140) {
      return alert("Whoops! Your tweet is too long!");
    } else {
      //turn entry into query string
      var entry = $(this).serialize();
      $.ajax({
        method: "post",
        url: "/tweets",
        data: entry
      }).done(function () {
        //reset the form, load the tweets including the new one
        tweetform.reset();
        loadTweets();
      });
    }
  });




})

