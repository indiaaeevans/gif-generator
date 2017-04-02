 // Event listener for when user clicks the button to add new topic
    $("#add-button").on("click", function() {
      // prevent page reload when button is clicked
      event.preventDefault();
      // take the topic typed by the user and store to a variable
      var topic = $("#user-input").val();
      // create a new <a> element
      var newButton = $("<a>");
      // style the button to match the existing buttons
      newButton.attr("class", "waves-effect waves-light btn");
      // give it a data attribute to store the topic
      newButton.attr("data-topic", topic);
      // label the button with the topic
      newButton.text(topic);
      // show the new button inside of the button display div
      $("#button-display").append(newButton);
    });
    // use on function to trigger the event on dynamically created elements
     $(document).on("click", '.btn', function() {
        // store topic corresponding with the button clicked
        var searchParameter = $(this).data('topic');
        // run the ajax request
        ajaxRequest(searchParameter);
    });

    function ajaxRequest(topic) {
      // Constructing a URL to search Giphy for the topic selected
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
        // clear the form
         $("#user-input").val("");

        // clear the display div
        $("#gif-display").text("");

          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              
              var gifDiv = $("<div>")
              .addClass("gifdiv");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var newGif = $("<img>");

              // create attributes to save the still and animated images
              newGif.attr({
                "data-animate": results[i].images.fixed_width.url,
                "data-still": results[i].images.fixed_width_still.url,
                "src": results[i].images.fixed_width_still.url,              
                "data-state": "still",
                "class": "gif"
              });

              // Appending the paragraph and gif we created to the "gifDiv" div
              gifDiv.append(p);
              gifDiv.append(newGif);

              // Prepending the gifDiv to the display div in the HTML
              $("#gif-display").prepend(gifDiv);
            }
          }
        });
      }

     $(document).on("click", '.gif', function() {
      // store the data state to a variable
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });