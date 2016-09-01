
'use strict';

var constants = [ 
    /*{
        name: "gravitational constant",
        value: "6.674",
        multiplier: "ten to the -11",
        mesure: "Newton by square meter divided by sqaure kilogram",
    },
    {
        name: "atomic mass constant",
        value: "1.660 538",
        multiplier: "ten to the -27",
        mesure: "kilogram",
    },*/
    {
        name: "eulers number",
        value: "2.71828",
        multiplier: "",
        mesure: "",
    },
    {
        name: "archimedes constant",
        value: "3.1415",
        multiplier: "",
        mesure: "",
    },
    {
        name: "pi number",
        value: "3.1415",
        multiplier: "",
        mesure: "",
    },
        {
        name: "pythagoras constant",
        value: "1.41421",
        multiplier: "",
        mesure: "",
    },
    {
        name: "imaginary unit",
        value: "square root from -1",
        multiplier: "",
        mesure: "",
    },
    {
        name: "the golden ratio",
        value: "1.6180",
        multiplier: "",
        mesure: "",
    },
    {
        name: "the euler mascheroni constant",
        value: "0.57721",
        multiplier: "",
        mesure: "",
    },
    {
        name: "universal parabolic constant",
        value: "2.29558",
        multiplier: "",
        mesure: "",
    },
    {
        name: "landaus constant",
        value: "0.5",
        multiplier: "",
        mesure: "",
    },
    {
        name: "pi",
        value: "3.1415",
        multiplier: "",
        mesure: "",
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
    if ("GiveMeConstantIntent" === intentName) {
        constantValueRequest(intent, session, callback);
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


var CARD_TITLE = "math constants"; 

function getWelcomeResponse(callback) {
    var sessionAttributes = {};
    var speechOutput = "This is a math and physics constants reminder. Please say a name of constant to hear it's value.";
    var repromptText = "You can say: pi number or what is the value of pi";
    var shouldEndSession = false;

    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function constantValueRequest(intent, session, callback) {
    var sessionAttributes = {};
    var speechOutput;
    var constantName = intent.slots.constant.value;
    if (constantName) {
        speechOutput = fetchConstantValue(constantName);
    } else {
        speechOutput = "Please say a name of constant ot hear it's value."
    }
    var repromptText = speechOutput;
    var shouldEndSession = true;

    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleGetHelpRequest(intent, session, callback) {
    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.
    var speechOutput = "To hear value of the constant tell me it's name.",
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
        buildSpeechletResponseWithoutCard("Thank you! I hope is was helpful.", "", shouldEndSession));
}

function fetchConstantValue(constantName) {
    var value;
    for (var i = 0; i < constants.length; i++) {
        if (constantName.toLowerCase() == constants[i].name) {
            //value = constants[i].name + " is equal " + constants[i].value + " multiply by " + constants[i].multiplier + constants[i].mesure;
            value = constants[i].name + " is equal to " + constants[i].value;
            return value;
        }
    }
    value = "This constant is not supported by our app.";
    return value;
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