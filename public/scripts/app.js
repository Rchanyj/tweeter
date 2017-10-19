/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  //Turn tweet query string into structured DOM to render:

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
              text: moment(tweetData.created_at).fromNow()
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
      //clear list to prevent duplicates:
      $("#tweet-storage").empty();
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

  loadTweets();


})

