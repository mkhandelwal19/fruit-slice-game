{
  /* <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jq
uery.min.js"></script>
<link
      rel="stylesheet"
      href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.
3/themes/start/jquery-ui.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3
/jquery-ui.min.js"></script> */
}

var playing = false;
var score;
var trialsLeft;
var fruits = [
  "apple",
  "Banana",
  "grapes",
  "pineapple",
  "watermelon",
  "cherries",
  "mango",
];
var step;
var action; //used for set interval function
$(function () {
  //click on start/ reset button
  $("#startReset").click(function () {
    //are we playing
    if (playing == true) {
      //if yes

      //reload game
      location.reload();
    } else {
      //we are not playing
      playing = true;

      //set score to 0
      score = 0;
      $("#scoreValue").html(score);

      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;

      addHeart();

      //to hide the gameOver box
      $("#gameOver").hide();

      //change button text to "reset game"
      $("#startReset").html("Reset Game");

      //start sending fruits
      startAction();
    }
  });

  $("#fruit1").mouseover(function () {
    score++;
    $("#scoreValue").html(score); //updating the score

    //audio file -> to play sound
    // document.getElementById("sliceSound").play();
    $("#sliceSound")[0].play(); //will return the array, 1st element -> audio element

    //stop fruit from going down
    // stopAction();
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    //for the above function to work we need to embed jQuery ui, otherwise it will throw an error

    //send new fruit
    setTimeout(startAction, 500);
  });

  function addHeart() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
  }

  function startAction() {
    //generate a fruit
    $("#fruit1").show();

    chooseFruit(); //choose a random fruit
    $("#fruit1").css({
      //random position
      left: Math.round(550 * Math.random()),
      top: -50,
    });

    //generate a random step
    step = 1 + Math.round(5 * Math.random()); // we will get a step b/w 1 & 6
    //change step

    //Move fruit down by one step every 10ms
    action = setInterval(function () {
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      //check if fruit is too low
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //check if trials left
        if (trialsLeft > 1) {
          //generate a fruit
          $("#fruit1").show();

          chooseFruit(); //choose a random fruit
          $("#fruit1").css({
            //random position
            left: Math.round(550 * Math.random()),
            top: -50,
          });

          //generate a random step
          step = 1 + Math.round(5 * Math.random()); // we will get a step b/w 1 & 6
          //change step

          //reduce trials by one
          trialsLeft--;

          //populate trialsLeft box
          addHeart();
        } else {
          //game over
          playing = false; //we are not playing now

          //changing the text of start/reset button
          $("#startReset").html("Start Game");

          //Game over message
          $("#gameOver").show();

          $("#gameOver").html(
            "<p>GAME OVER!</p><p>your score is " + score + ".</p>"
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  //generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(6 * Math.random())] + ".png"
    );
  }

  //stop dropping fruit
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
