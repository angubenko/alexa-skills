'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        question: "A means of encoding text in which each symbol is represented by 16 bits is called",
        answer: "unicode"
    },
    {
        question: "A digital circuit capable of holding a single digit is called?",
        answer:   "flip-flop"
    },
    {
        question: "A means of compressing images by blurring the boundaries between different colors while maintaining all brightness information ?",
        answer:    "jpeg"
    },
    {
        question: "The tracks on a disk which can be accessed without repositioning the R/W heads is?",
        answer:    "cylinder"
    },
    {
        question: "The binary system uses powers of?",
        answer:    "2"
    },
    {
        question: "A computer program that converts assembly language to machine language is",
        answer:    "assembler"
    },
    {
        question: "A computer program that compiles code is",
        answer:    "compiler"
    },
    {
        question: "The time required for the fetching and execution of one simple machine instruction is",
        answer:    "cpu cycle"
    },
    {
        question: "The section of the CPU that selects, interprets and sees to the execution of program",
        answer:    "instructions"
    },
    {
        question: "A common boundary between two systems is called",
        answer:    "interface"
    },
    {
        question: "The section of the CPU that selects, interprets and sees to the execution of program instructions",
        answer:    "control unit"
    },
    {
        question: "To avoid the race condition, the number of processes that may be simultaneously inside their critical section is",
        answer:    "1"
    },
    {
        question: "The algorithm that executes first the job that first entered the queue is called",
        answer:   "fifo"
    },
    {
        question: "The register or main memory location which contains the effective address of the operand is known as",
        answer:   "pointer"
    },
    {
        question: "Resolution of externally defined symbols is performed by",
        answer:   "linker"
    },
    {
        question: "The algorithm that executes first the job that last entered the queue is called",
        answer:   "lifo"
    },
    {
        question: "The data structure which uses FIFO algorithm to access the data",
        answer: "queue"
    },
    {
        question: "The data structure which uses LIFO algorithm to access the data",
        answer: "stack"
    },
    {
        question: "Which data structure is used to implement associative array and can map keys to values",
        answer: "hash table"
    },
    {
        question: "Value that enables a program to indirectly access a particular memory location",
        answer: "reference"
    }
];


exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;
    
    // dispatch custom intents to handlers here
    if ("NewGameIntent" === intentName) {
        handleNewGameRequest(intent, session, callback);
    } else if ("AnswerIntent" === intentName) {
        handleQuestionAnswer(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    }
}

function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var CARD_TITLE = "Computer Science Quiz"; 
var GAME_LENGTH = 5;
for (var INDEX_ARRAY=[],i=0;i<questions.length;++i) INDEX_ARRAY[i]=i;

function getWelcomeResponse(callback) {
    var sessionAttributes = {};
    var speechOutput = "Welcome to the computer science quiz app. To start a new game say start.";
    var repromptText = "To start a new game say: start a new game or just start.";
    var correctAnswers = 0;
    var gameInProgress = false;
    var questionIndex = 0;
    var shouldEndSession = false;

    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "correctAnswers": correctAnswers,
        "gameInProgress": gameInProgress,
        "questionIndex": questionIndex,

    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleNewGameRequest(intent, session, callback) {
    var sessionAttributes = {};

    INDEX_ARRAY = shuffleArray(INDEX_ARRAY);

    var questionIndex = 1;
    var gameInProgress = true;
    var correctAnswers = 0;
    var speechOutput = "Here is the first question. " + questions[INDEX_ARRAY[questionIndex]].question;
    var repromptText = "Please answer the following question. " + questions[INDEX_ARRAY[questionIndex]].question;
    var shouldEndSession = false;


    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "correctAnswers": correctAnswers,
        "gameInProgress": gameInProgress,
        "questionIndex": questionIndex,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

// handle user's question answer
function handleQuestionAnswer(intent, session, callback) {
    var sessionAttributes = {};

    var questionIndex = session.attributes.questionIndex;
    var gameInProgress = session.attributes.gameInProgress;
    var correctAnswers = session.attributes.correctAnswers;
    var speechOutput = "";
    var repromptText = "Please answer the following question. " + questions[INDEX_ARRAY[questionIndex]].question;
    var shouldEndSession = false;

    if (intent.slots.answer.value == null) {
            speechOutput = "I'm sorry, I haven't recongnised your answer. Say my answer is or just tell me what your answer is."
            repromptText = speechOutput;
    } else {
        if (gameInProgress) {
            // Handle question answer
            if(intent.slots.answer.value.toString().toLowerCase() == questions[INDEX_ARRAY[questionIndex]].answer) {
                correctAnswers += 1;
                speechOutput = "Kudos! ";
            } else {
                speechOutput = "Wrong! Correct answer is " + questions[INDEX_ARRAY[questionIndex]].answer + ". ";
            }
            // Check if game should be ended
            if (questionIndex === GAME_LENGTH) {
                speechOutput += "That was your last question. You got " + correctAnswers.toString() + " correct out of " + GAME_LENGTH.toString() + " . Say start to start a new game or stop to exit.";
                gameInProgress = false;
            } else {
                questionIndex += 1;
                speechOutput += "Here is the next question. " + questions[INDEX_ARRAY[questionIndex]].question;
                gameInProgress = true;
            }
        } else {
            speechOutput = "I'm sorry, there is no game in progress. Say start to start a new game or stop to exit."
            repromptText = speechOutput;
        }
    }

    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "correctAnswers": correctAnswers,
        "gameInProgress": gameInProgress,
        "questionIndex": questionIndex,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleGetHelpRequest(intent, session, callback) {
    var sessionAttributes = {};
    var gameInProgress;
    var questionIndex;
    var correctAnswers;

    if (session.attributes){
        gameInProgress = session.attributes.gameInProgress;
        questionIndex = session.attributes.questionIndex;
        correctAnswers = session.attributes.correctAnswers;
    } else {
        gameInProgress = false;
        correctAnswers = 0;
        questionIndex = 0;
    }

    //var speechOutput = "To start a new game say: start a new game or lets start.";
    var speechOutput = "This is a computer science quiz app. During quiz, I will ask you 5 computer science related questions. Dou you want to start? You may say start a new quiz or just start to begin. To exit anytime say stop or cancel.";

    if (gameInProgress) {
        speechOutput = "To continue playing please answer the following question. " + questions[INDEX_ARRAY[questionIndex]].question;
    }

    var repromptText = "To start the quiz say start a new quiz or just start. To exit anytime say stop or cancel.";
    var shouldEndSession = false;
    
    
    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "correctAnswers": correctAnswers,
        "gameInProgress": gameInProgress,
        "questionIndex": questionIndex,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    var shouldEndSession = false;
    
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, shouldEndSession));
    }
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a custom closing statment when the user wants to quit the game
    var shouldEndSession = true;
    
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thank you! I hope you have learned something new.", "", shouldEndSession));
}

function shuffleArray(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) { 
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}