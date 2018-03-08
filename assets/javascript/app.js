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
    });

    // Display the gameboard for the current question
    function displayCurrentQuestion() {

        // Timer function for each question
        var timeLeft = 21;
        var intervalId = setInterval(timerCountdown, 1000);

        function timerCountdown() {
            timeLeft--;
            $("#timer").html(timeLeft);

            if (timeLeft < 1) {
                clearInterval(intervalId);
                $("#time-remaining").hide();
                $("#answer").html("<h3>Time's Up!</h3><p>The correct answer is:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
                setTimeout(function () {
                    if (currentQuestion < triviaQuestions.length - 1) {
                        newQuestion();
                    }
                    else if (currentQuestion === triviaQuestions.length - 1) {
                        endGame();
                    }
                }, 5000);
            };
        }

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
        })

        // Create "Next Question" button
        var nextQuestionButton = $("<button>");
        nextQuestionButton.attr("id", "next-question");
        nextQuestionButton.append("Submit");
        $("#question").append(nextQuestionButton);

        // Click on "Next Question" button to generate new question
        $("#next-question").on("click", function () {
            if (userGuess === triviaQuestions[currentQuestion].solution) {
                totalCorrect++;
                clearInterval(intervalId);
                $("#time-remaining").hide();
                $("#answer").html("<h3>That's right!</h3><p>The correct answer is:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
                setTimeout(function () {
                    if (currentQuestion < triviaQuestions.length - 1) {
                        newQuestion();
                    }
                    else if (currentQuestion === triviaQuestions.length - 1) {
                        endGame();
                    }
                }, 5000);
            }
            if (userGuess != triviaQuestions[currentQuestion].solution) {
                clearInterval(intervalId);
                $("#time-remaining").hide();
                $("#answer").html("<h3>Oh no, that's wrong!</h3><p>The correct answer is:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
                setTimeout(function () {
                    if (currentQuestion < triviaQuestions.length - 1) {
                        newQuestion();
                    }
                    else if (currentQuestion === triviaQuestions.length - 1) {
                        endGame();
                    }
                }, 5000);
            }
        });
    };

    function displayQuestionTracker() {
        // Generate question tracker buttons
        for (var i = 0; i < triviaQuestions.length; i++) {
            var questionTracker = $("<div>");
            questionTracker.addClass("question-tracker");
            questionTracker.attr("id", num++);
            $("#question-tracker").append(questionTracker);

            console.log(questionTracker.attr("id"));
            console.log("Current question: " + currentQuestion);
        }
    };

    function newQuestion() {
        currentQuestion++;
        $("#question").html("");
        $("#answer").html("");
        displayCurrentQuestion();
        $("#time-remaining").show();
    }

    function endGame() {
        $(".gameboard").hide();
        $(".end-game").fadeIn();
        $("#right-answers").html(totalCorrect + " out of " + totalQuestions);

        if (totalCorrect > 3) {
            $("#comment").html("Good job!");
        }
        if (totalCorrect === 3) {
            $("#comment").html("Better hit the books!");
        } else if (totalCorrect < 3) {
            $("#comment").html("See me after class...");
        }
    };

    // Refresh the quiz
    $("#try-again").on("click", function () {
        location.reload(true);
    })

});