'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "A means of encoding text in which each symbol is represented by 16 bits is called": [
            "Unicode"
        ]
    },
    {
        "A digital circuit capable of holding a single digit is called?": [
            "Flip-flop"
            
        ]
    },
    {
        "A means of compressing images by blurring the boundaries between different colors while maintaining all brightness information ?": [
            "JPEG"
        ]
    },
    {
        "The tracks on a disk which can be accessed without repositioning the R/W heads is?": [
            "Cylinder"
        ]
    },
    {
        "The binary system uses powers of?": [
            "two"
        ]
    },
    {
        "A computer program that converts assembly language to machine language is": [
            "Assembler"
        ]
    },
    {
        "A computer program that compiles code is": [
            "Compiler"
        ]
    },
    {
        "The time required for the fetching and execution of one simple machine instruction is": [
            "CPU cycle"
        ]
    },
    {
        "The section of the CPU that selects, interprets and sees to the execution of program": [
            "Instructions"
        ]
    },
    {
        "A common boundary between two systems is called": [
            "interface"
        ]
    },
    {
        "The section of the CPU that selects, interprets and sees to the execution of program instructions": [
            "Control unit"
        ]
    },
    {
        "To avoid the race condition, the number of processes that may be simultaneously inside their critical section is": [
            "one"
        ]
    },
    {
        "The algorithm that executes first the job that first entered the queue is called": [
            "FIFO"
        ]
    },
    {
        "The register or main memory location which contains the effective address of the operand is known as": [
            "Pointer"
        ]
    },
    {
        "Resolution of externally defined symbols is performed by": [
            "Linker"
        ]
    },
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
    if ("FactTypeIntent" === intentName) {
        factTypeRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        getWelcomeResponse(callback);
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


var CARD_TITLE = "Fact Master"; 

function getWelcomeResponse(callback) {
    var sessionAttributes = {};
    var speechOutput = "Please name a field of science to hear an interesting fact. You can choose between mathematics, biology, history and physics.";
    var repromptText = "You can say: tell me biology fact, I want to hear about biology or just say biology.";
    var factType = "";
    var shouldEndSession = false;

    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "factType": factType,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function factTypeRequest(intent, session, callback) {
    var sessionAttributes = {};
    var speechOutput;
    var factType = intent.slots.factType.value;
    // Check if response between supported fact types
    if (factType === 'mathematics' || factType === 'math' || 
        factType === 'biology' || factType === 'physics' || factType === 'history') {
        var fact = getFact(factType);
        speechOutput = "Did you know " + fact + ". Do you want another fact?";
    } else {
        speechOutput = "I didn't recongnise a science field. Please choose from mathematics, biology, physics and history."
    }
    var repromptText = speechOutput;
    var shouldEndSession = false;

    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "factType": factType,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleGetHelpRequest(intent, session, callback) {
    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.
    var speechOutput = "To hear an interesting fact, name a field of science. You can choose between mathematics, biology, history and physics. You can say: tell me biology fact, I want to hear about biology or just say biology.",
        repromptText = speechOutput;
    var shouldEndSession = false;
    
    
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a custom closing statment when the user wants to quit the game
    var shouldEndSession = true;
    
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thank you! I hope you have learned something new.", "", shouldEndSession));
}

function getFact(factType){
    var fact, random;

    if (factType === 'mathematics' || factType === 'math') {
        random = Math.floor(Math.random() * (mathFacts.length - 0 + 1) + 0);
        fact = mathFacts[random];
    } else if (factType === 'biology') {
        random = Math.floor(Math.random() * (biologyFacts.length - 0 + 1) + 0);
        fact = biologyFacts[random];
    } else if (factType === 'physics') {
        random = Math.floor(Math.random() * (physicsFacts.length - 0 + 1) + 0);
        fact = physicsFacts[random];
    } else if (factType === 'history') {
        random = Math.floor(Math.random() * (historyFacts.length - 0 + 1) + 0);
        fact = historyFacts[random];
    }
    return fact;
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