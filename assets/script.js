var startBtn = document.querySelector("#start-btn");
var incorrectAnswerBtn = document.querySelector(".incorrect-answer-btn");
var correctAnswerBtn = document.querySelector(".correct-answer.btn");
var initialSubmitBtn = document.querySelector("#initial-submit-btn");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");
var toHighscores = document.querySelector("#to-highscores");

var announcement = document.querySelector(".announcement");

var highscoreList = document.querySelector("#highscore-list");
var highscoreInput = document.querySelector("#initials-text");

var timer = document.querySelector("#timer");

var score = "";
var highscores = [];

var secondsLeft = 60;
var interval;

init();
startTimer();

function startTimer() {
    interval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(interval);
            // function (?) to grab score and go to submit page
        }
    }, 1000);
}

toHighscores.addEventListener("click", function() {
    document.querySelector("#start").className = "container hide";
    document.querySelector("#question-one").className = "container question hide";
    document.querySelector("#question-two").className = "container question hide";
    document.querySelector("#question-submit").className = "container hide";

    document.querySelector("#highscores").className = "container display";
});

startBtn.addEventListener("click", function() {
    document.querySelector("#start").className = "container hide";
    document.querySelector("#question-one").className = "container question hide";
});

correctAnswerBtn.addEventListener("click", function() {});

incorrectAnswerBtn.addEventListener("click", function() {});



function renderHighscore() {
    // Clear highscoreList element
    highscoreList.innerHTML = "";

    // Render a new li for each highscore-initial
    for (var i = 0; i < highscores.length; i++) {
        var highscore = highscores[i];

        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);

        highscoreList.appendChild(li);
    }

}

function init() {
    // Get stored highscores from localStorage
    // Parsing the JSON string to an object
    var storedScores = JSON.parse(localStorage.getItem("highscores"));

    // If highscores are retrieved from localStorage, update the highscores array to it
    if (storedScores !== null) {
        highscores = storedScores;
    }

    // Render highscores to the DOM
    renderHighscore();
}

function storeScores() {
    // Stringify and set "highscores" key in localStorage to highscores array
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function alignHighscores() {};


initialSubmitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var highscoreText = highscoreInput.value.trim();

    // Return from function early if submitted highscoreText is blank
    if (highscoreText === "") {
        return;
    }

    // Add new highscoreText to highscores array, clear the input
    highscores.push(highscoreText);
    highscoreInput.value = "";

    // Store the updated highscores in localStorage, re-render list
    storeScores();
    renderHighscore();
})

backBtn.addEventListener("click", function() {});

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    highscoreList.innerHTML = "";

    // BUG: Cannot get to clear memory
});