//Char counter

$(document).ready(function () {

    console.log("ready!");


//Register event handler for textarea element of form inside of .new-tweet
// Using this to grab the VALUE of the textarea, determine length of input
// update the value of the counter to this value

    $(".new-tweet textarea").on("keyup", function() {
      var chars = $(this).val().length;
      var charsleft = 140 - chars;
      var counter = $(this).parent("form").find(".counter");
      counter[0].innerText = charsleft;

    //Turn counter number red if below 0:
      if (charsleft < 0) {
        counter.css("color", "red");
      } else {
        counter.css("color", "#244751");
      }
    });
});