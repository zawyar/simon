var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var userChosenColor = "";
const buttonGreen = $("#green");
const buttonRed = $("#red");
const buttonYellow = $("#yellow");
const buttonBlue = $("#blue");
var level = 1;
var gamePattern = [];
var randomNumber;
function nextSequence() {
    randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = randomNumber;
    gamePattern.push(buttonColors[randomChosenColor]);
    var chosenElement = gamePattern[gamePattern.length -1];
    $("div."+chosenElement).fadeOut(100,function () {
        $("div."+chosenElement).fadeIn(100);
        playSound(chosenElement);
    });
    $("h1").text("Level "+level.toString());
    level += 1;
    userClickedPattern = [];
    if(level == 1){
        document.removeEventListener("keypress",nextSequence);
    }
}
document.addEventListener("keypress",nextSequence);
function playSound(chosenColorElement) {
        let playPromise = new Audio("sounds/"+chosenColorElement+".mp3").play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Automatic playback started!
            }).catch(function(error) {
                console.log("Playback failed"+error.toString());
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }

}
function animatePress(button){
    button.addClass("pressed");
    setTimeout(function () {
        button.removeClass("pressed");
    },100);
}
function checkAnswer(){
    if(userClickedPattern.length === gamePattern.length && userClickedPattern.every((value, index) => value === gamePattern[index])){
        setTimeout(nextSequence,1000);
    } else if( userClickedPattern.length ===gamePattern.length){

        $("h1").text("Game Over. Press Any Key to Restart");
        document.addEventListener("keypress",nextSequence);
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
    }
}
buttonGreen.on("click",function () {
    userChosenColor = "green";
    userClickedPattern.push(userChosenColor);
    animatePress(buttonGreen);
    playSound("green");
    checkAnswer();
});
buttonRed.on("click",function () {
    buttonRed.addClass("pressed");
    userChosenColor = "red";
    userClickedPattern.push(userChosenColor);
    animatePress(buttonRed);
    playSound("red");
    checkAnswer();
});
buttonYellow.on("click",function () {
    userChosenColor = "yellow";
    userClickedPattern.push(userChosenColor);
    animatePress(buttonYellow);
    playSound("yellow");
    checkAnswer()
});
buttonBlue.on("click",function () {
    userChosenColor = "blue";
    userClickedPattern.push(userChosenColor);
    animatePress(buttonBlue);
    playSound("blue");
    checkAnswer();
});





