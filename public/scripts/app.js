/*
 Client-side js
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
                }),
                $("<span>", {
                  "data-type": "like_s",
                  text: tweetData.likes
                  "data-type": "id"
                  text: tweetData
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
    var counter = $("form").find(".counter");
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
        //counter returns to 140 after submission:
        counter[0].innerText = 140;
        loadTweets();
      });
    }
  });

  //When the heart icon is clicked, "like" is updated to 1
  //for the tweet with the MATCHING obj ID --> how to find this?
  //If value is 0, reset to 0.
  $(".tweet-footer .like").on("click", function() {
      var identify = $(this).parent("span").data("id"); //<--right syntax?
      $.ajax({
        method: "PUT",
        url: "/tweets/:id"
        //send obj id to be matched in Mongo:
        data: identify.serialize();
      }).done(function () {
        loadTweets();
      });
    })

  loadTweets();


})

