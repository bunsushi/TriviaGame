$(document).ready(function () {

    // Object array containing trivia game questions, answers, and solution
    var triviaQuestions = [{
        question: "What is the name of my dog?",
        answers: ["Victor", "Hugo", "Clement", "Francis"],
        solution: "Victor"
    }, {
        question: "What is my favorite food?",
        answers: ["Cheese", "Pizza", "Falafel", "Ice Cream"],
        solution: "Falafel"
    }, {
        question: "How many stars are in the solar system?",
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
    var totalIncorrect = 0; // Number of incorrect user answers

    var userGuess; // Holds user guess

    var num = 0; // Counter for question tracker id

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

        // Display current question
        var questionText = "<h3>" + triviaQuestions[currentQuestion].question + "</h3>"
        $("#question").append(questionText);
        $("#question").append("<div class='answer-button'>");

        // Timer function for each question
        // TO DO: reset the timer when user either submits question or fails question
        var timeLeft = 21;
        var intervalId = setInterval(timerCountdown, 1000);

        function timerCountdown() {
            timeLeft--;
            $("#timer").html(timeLeft);

            // ATTN stops at 0, then upon submit, changes from -1 to 30
            if (timeLeft < 1) {
                clearInterval(intervalId);
                $("#time-remaining").hide();
                $("#answer").html("<h3>Time's Up!</h3><p>The correct answer was:</p><h3>" + triviaQuestions[currentQuestion].solution + "</h3>");
                setTimeout(function () {
                    if (currentQuestion < triviaQuestions.length - 1) {
                        currentQuestion++;
                        $("#question").html(""); // clear gameboard questions
                        $("#answer").html(""); // clear answer
                        displayCurrentQuestion();
                        clearInterval(intervalId);
                        $("#time-remaining").show();
                    }
                    else if (currentQuestion === triviaQuestions.length - 1) {
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
                    }
                    },
                    5000);
            };
        }

        // Generate buttons for possible answers
        for (var i = 0; i < triviaQuestions[currentQuestion].answers.length; i++) {
            // var answerOption = $("<label class='radio'><input type='radio' name='option' value=" + triviaQuestions[currentQuestion].answers[i] + ">");
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
            console.log(userGuess);
        })

        // Create "Next Question" button
        var nextQuestionButton = $("<button>");
        nextQuestionButton.attr("id", "next-question");
        nextQuestionButton.append("Submit");
        $("#question").append(nextQuestionButton);

        // Click on "Next Question" button to generate new question
        $("#next-question").on("click", function () {
            if (userGuess === triviaQuestions[currentQuestion].solution) {
                console.log("Huzzah");
                totalCorrect++;
                console.log("Correct answers: " + totalCorrect);
            }
            else {
                console.log("Whoops");
            }

            // Next question
            if (currentQuestion < triviaQuestions.length - 1) {
                currentQuestion++;
                $("#question").html(""); // clear gameboard questions
                $("#timer").html(""); // clear countdown timer
                displayCurrentQuestion(); // repopulate gameboard
                clearInterval(intervalId); // clear the timer
                timerCountdown(); // reset the timer
            }
            // If id question-NUMBER = index number of currentQuestion
            // Change questionTracker class to "question-tracker-active"

            // End game
            else if (currentQuestion === triviaQuestions.length - 1) {
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
            }
        });
    };

    function displayQuestionTracker() {
        // Generate question tracker buttons
        for (var i = 0; i < triviaQuestions.length; i++) {
            var questionTracker = $("<div>");
            questionTracker.addClass("question-tracker");
            questionTracker.attr("id", "question-" + num++);
            $("#question-tracker").append(questionTracker);
        }
    };

    // Refresh the quiz
    $("#try-again").on("click", function () {
        location.reload(true);
    })

});