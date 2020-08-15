var startBtn = $("#start-btn");
var incorrectAnswer = $(".incorrect-answer-btn");
var correctAnswer = $(".correct-answer.btn");
var announcement = $(".announcement");
var initialSubmitBtn = $("#initial-submit-btn");
var highscoreList = $("#highscore-list");
var highscoreInput = $("#initials-text");

var highscores = [];

var timer = 60;

init();

function timer() {

}

$("#to-highscores").on("click", function() {});

$("#start-btn").on("click", function() {});

$(".correctAnswer").on("click", function() {});

$(".incorrectAnswer").on("click", function() {});



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


$("#initial-submit-button").on("click", function(event) {
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

function goBack() {

}

function clearHighscores() {

}