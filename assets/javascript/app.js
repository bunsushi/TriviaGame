$(document).ready(function () {

    // Object array containing trivia game questions, answers, and solution
    var triviaQuestions = [{
        question: "What is the most spoken language in the world?",
        answers: ["Chinese", "English", "Hindi", "Spanish"],
        solution: "Chinese"
    }, {
        question: "In which Malaysian state is the city of Kuching located?",
        answers: ["Penang", "Sabah", "Sarawak", "Selangor"],
        solution: "Sarawak"
    }, {
        question: "How many stars are in the galaxy?",
        answers: ["1 thousand million", "10 thousand million", "100 thousand million", "1 million million"],
        solution: "100 thousand million"
    }, {
        question: "Inana is a goddess in which ancient civilization?",
        answers: ["China", "India", "Egypt", "Mesopotamia"],
        solution: "Mesopotamia"
    }, {
        question: "Who won Super Bowl 52?",
        answers: ["New England Patriots", "Philadelphia Eagles", "Denver Broncos", "Seattle Seahawks"],
        solution: "Philadelphia Eagles"
    }];

    var currentQuestion = 0; // Index of question the object array triviaQuestions
    var totalQuestions = (Object.keys(triviaQuestions).length);
    var totalCorrect = 0; // Number of correct user answers
    var userGuess; // Holds user guess
    var num = 0; // Counter for question tracker id

    var intervalId; // Empty variable to hold set interval
    var timeLimit; // Empty variable to hold remaining question time

    // Display total number of questions on start
    $("#total-questions").html(totalQuestions + " questions");

    // Hide begin-game on load
    $(".gameboard").hide();

    // Hide results end-game on load
    $(".end-game").hide();

    // Click "Let's Do This" button to start game
    $("#begin").on("click", function () {
        $(".gameboard").fadeIn();
        $(".begin-game").hide();

        displayCurrentQuestion();
        displayQuestionTracker();
        checkQuestionTracker();
    });

    // Start the timer
    function timerCountdown() {
        timeLimit = 20;
        $("#timer").html(timeLimit)
        intervalId = setInterval(decrement, 1000);
    }

    // Decrement the timer
    function decrement() {
        timeLimit--;
        $("#timer").html(timeLimit);
        if (timeLimit === 0) {
            clearInterval(intervalId);
            $("#next-question").hide();
            $("#time-remaining").hide();
            $("#timer").html("");
            $("#answer").html("<h3>Time's Up!</h3><p>The correct answer is:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
            answerKey();
        }
    }

    // Display the gameboard for the current question
    function displayCurrentQuestion() {
        // Start the timer countdown
        timerCountdown();

        checkQuestionTracker()

        // Display current question
        var questionText = "<h3>" + triviaQuestions[currentQuestion].question + "</h3>";
        $("#question").append(questionText);
        $("#question").append("<div class='answer-button'>");

        // Generate buttons for possible answers
        for (var i = 0; i < triviaQuestions[currentQuestion].answers.length; i++) {
            var answerOption = $("<label class='radio'>");
            var answerInput = $("<input type='radio' name='option'>");
            answerInput.attr("value", triviaQuestions[currentQuestion].answers[i]);
            answerOption.append(answerInput);
            answerOption.append(triviaQuestions[currentQuestion].answers[i]);
            $(".answer-button").append(answerOption);
        }

        // Capture input
        $('input:radio').on("click", function () {
            userGuess = $(this).attr('value');

            // Change selected answer (and only selected answer) to dark blue
            $(".radio").removeClass("radio-active");
            $(this).parent().addClass("radio-active");
        })

        // Create "Next Question" button
        var nextQuestionButton = $("<button>");
        nextQuestionButton.attr("id", "next-question");
        nextQuestionButton.append("Submit");
        $("#question").append(nextQuestionButton);

        // Click on "Next Question" button to generate new question
        $("#next-question").on("click", function () {
            clearInterval(intervalId);
            $("#next-question").hide();
            if (userGuess === triviaQuestions[currentQuestion].solution) {
                totalCorrect++;
                $("#time-remaining").hide();
                $("#answer").html("<h3>That's right!</h3><p>The correct answer is:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
                answerKey();
            }
            if (userGuess != triviaQuestions[currentQuestion].solution) {
                $("#time-remaining").hide();
                $("#answer").html("<h3>Oh no, that's wrong!</h3><p>The correct answer is:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
                answerKey();
            }
        });
    };

    // Create question status buttons
    function displayQuestionTracker() {
        // Generate question tracker buttons
        for (var i = 0; i < triviaQuestions.length; i++) {
            var questionTracker = $("<div>");
            questionTracker.addClass("question-tracker");
            questionTracker.attr("id", num++);
            $("#question-tracker").append(questionTracker);

            // var questionNumber = questionTracker.attr("id");
            // console.log(questionNumber);

            // Add class question-tracker-active to question-tracker with same id as currentQuestion
        }
    };

    // Highlights cycled through questions
    function checkQuestionTracker() {
        $("#question-tracker .question-tracker").each(function() {
            $("#" + currentQuestion).addClass("question-tracker-active");
        })
    }

    // Generate next question or end game
    function newQuestion() {
        if (currentQuestion < triviaQuestions.length - 1) {
            currentQuestion++;
            $("#question").html("");
            $("#answer").html("");
            displayCurrentQuestion();
            $("#time-remaining").show();
        }
        else if (currentQuestion === triviaQuestions.length - 1) {
            endGame();
        }
    }

    // Set time out for 5 seconds after trivia response
    function answerKey() {
        setTimeout(function () {
            if (currentQuestion < triviaQuestions.length - 1) {
                newQuestion();
            }
            else if (currentQuestion === triviaQuestions.length - 1) {
                endGame();
            }
        }, 5000);
    }

    // Display trivia results
    function endGame() {
        $(".gameboard").hide();
        $(".end-game").fadeIn();
        $("#right-answers").html(totalCorrect + " out of " + totalQuestions);

        if (totalCorrect > 3) {
            $("#comment").html("Good job!");
        }
        if (totalCorrect === 3) {
            $("#comment").html("Better hit the books!");
        }
        else if (totalCorrect < 3) {
            $("#comment").html("See me after class...");
        }
    };

    // Refresh the quiz
    $("#try-again").on("click", function () {
        location.reload(true);
    })

});