$(document).ready(function() {

    var startBtn = document.querySelector("#start-btn");
    var incorrectAnswerBtn = document.querySelector(".incorrect-answer-btn");
    var correctAnswerBtn = document.querySelector(".correct-answer-btn");
    var initialSubmitBtn = document.querySelector("#initial-submit-btn");
    var backBtn = document.querySelector("#back-btn");
    var clearBtn = document.querySelector("#clear-btn");
    var toHighscores = document.querySelector("#to-highscores");

    var questionsDiv = document.querySelector("#questions");
    var questionOne = document.querySelector("#question-one");
    var questionTwo = document.querySelector("#question-two");
    var questions = [questionOne, questionTwo];

    var announcement = document.querySelector(".announcement");

    var highscoreList = document.querySelector("#highscore-list");
    var highscoreInput = document.querySelector("#initials-text");

    var timer = document.querySelector("#timer");

    var score = 0;
    var highscores = [];

    var secondsLeft = 60;
    var interval;

    init();
    startTimer();

    function startTimer() { // how to only run when secondsLeft > 0
        interval = setInterval(function() {
            secondsLeft--; 
            timer.textContent = secondsLeft;

            if (secondsLeft === 0) { // how to constantly check this?
                clearInterval(interval);

                document.querySelector("#start").className = "container hide";
                document.querySelectorAll(".question").className = "container question hide";
                document.querySelector("#submit").className = "container display";
                // function (?) to grab score and go to submit page
            }
        }, 1000);
    }

    toHighscores.addEventListener("click", function() {
        document.querySelector("#start").className = "container hide";
        document.querySelector("#question-one").className = "container question hide";
        document.querySelector("#question-two").className = "container question hide";
        document.querySelector("#submit").className = "container hide";

        document.querySelector("#highscores").className = "container display";
    });

    startBtn.addEventListener("click", function() {
        document.querySelector("#start").className = "container hide";
        document.querySelector("#question-one").className = "container question display";
    });

    questionsDiv.addEventListener("click", function(event) {
        var element = event.target;

        // If a button clicked within questionsDiv
        if (element.matches("button") === true) {
            for (i = 0; i > questions.length;) {
                questions[i].className = "container question hide";
                questions[i++].className = "container question display";
            }
            
        }
    });

    correctAnswerBtn.addEventListener("click", function() {
        score++;

        // console.log(this.className);
    });

    incorrectAnswerBtn.addEventListener("click", function() {
        secondsLeft -= 5;
    });

    // function that when any button is clicked in .question, move to next .question element
    // way to code so that all I don't have to change class names of each question?

    // way for next announcement to default from here?


    function alignHighscores() {
        highscores.sort(function(a,b) {
            return b.score - a.score;
        })
    };

    function renderHighscore() {
        // Clear highscoreList element
        highscoreList.innerHTML = "";
        alignHighscores();

        // for array?
        /*for (var i = 0; i < highscores.length; i++) {

            if (highscores[i] % 2 === 0) { // if it's an even number
                var highscore = highscores[i];
            } else {
                var initials = highscores[i];
            }
        } */


        for (var i = 0; i< highscores.length; i++) {
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

    initialSubmitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        var highscoreText = score + " " + highscoreInput.value.trim();
        console.log(highscores);

        // Return from function early if submitted highscoreText is blank
        if (highscoreText === "") {
            return;
        }

        // Add new highscoreText to highscores array, clear the input
        highscores.push(highscoreText);
        console.log(highscoreText);
        highscoreInput.value = "";

        // Store the updated highscores in localStorage, re-render list
        storeScores();
        renderHighscore();

        // To Highscores
        document.querySelector("#submit").className = "container hide";
        document.querySelector("#highscores").className = "container display";

    })

    backBtn.addEventListener("click", function() {
        document.querySelector("#highscores").className = "container hide";
        document.querySelector("#start").className = "container display";

        score = 0;
        secondsLeft = 60;
        startTimer();
    });

    clearBtn.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        highscoreList.innerHTML = "";

        highscores = [];
    });

});