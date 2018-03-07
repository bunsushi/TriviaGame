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
        answers: ["0", "1"],
        solution: ""
    }, {
        question: "Inana is a goddess in which ancient civilization?",
        answers: ["0", "1"],
        solutions: ""
    }, {
        question: "Who won Super Bowl 52?",
        answers: ["0", "1"],
        solutions: ""
    }];

    var currentQuestion = 0; // Index of question the object array triviaQuestions
    var totalCorrect = 0; // Number of correct user answers
    var totalIncorrect = 0; // Number of incorrect user answers

    // Hide begin-game on load
    // $(".gameboard").hide();

    // Hide results end-game on load
    // $(".end-game").hide();

    // Click "Let's Do This" button to start game
    $("#begin").on("click", function () {
        $(".gameboard").fadeIn();
        $(".begin-game").hide();
    });

    // Display the gameboard for the current question
    function displayCurrentQuestion() {
        // Display current question
        $("#question").append("<h3>" + triviaQuestions[currentQuestion].question + "</h3>");

        // Generate buttons for possible answers
        for (var i = 0; i < triviaQuestions[currentQuestion].answers.length; i++) {
            var answerOption = $("<button>");
            answerOption.addClass("answer-button");
            answerOption.append(triviaQuestions[currentQuestion].answers[i]);
            $("#question").append(answerOption);
        }

        // Create "Next Question" button
        var nextQuestionButton = $("<button>");
        nextQuestionButton.attr("id", "next-question");
        nextQuestionButton.append("Submit");
        $("#question").append(nextQuestionButton);

        // Click on "Next Question" button to generate new question
        $("#next-question").on("click", function () {
            if (currentQuestion < triviaQuestions.length - 1) {
                currentQuestion++;
                console.log(currentQuestion);
                $("#question").html("");
                displayCurrentQuestion();
            }
            else {
                $(".gameboard").hide();
                $(".end-game").fadeIn();
            }
        });
    };

    function displayQuestionTracker() {
        // Generate question tracker buttons
        for (var i=0; i < triviaQuestions.length; i++) {
            var questionTracker = $("<div>");
            questionTracker.addClass("question-tracker");
            $("#question-tracker").append(questionTracker);
        }
    };

    displayCurrentQuestion();
    displayQuestionTracker();

    $("#try-again").on("click", function () {
        location.reload(true);
    })

});