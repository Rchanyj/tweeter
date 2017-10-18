//Char counter

$(document).ready(function () {

    console.log("ready!");


//Register event handler for textarea element of form inside of .new-tweet
// Using this to grab the VALUE of the textarea, determine length of input

    $(".new-tweet textarea").on("keyup", function() {
      var chars = $(this).val().length;
      var charsleft = 140 - chars;
      $(this).parent("form").find(".counter")[0].innerText = charsleft;
    });

});