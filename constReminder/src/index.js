
'use strict';

var mathFacts = [
    'that the Pythagorean Theorem generalizes to any three similar shapes on the three sides of a right-angled triangle?',
    'that the sum of the first n odd numbers divided by the sum of the next n odd numbers is always equal to one third',
    'that no matter how biased a coin one uses, flipping a coin to determine whether each edge is present or absent in a countably infinite graph will always produce the same graph, the Rado graph?',
    'that Euler found 59 more amicable numbers while for 2000 years, only 3 pairs had been found before him?',
    'that there are 6 unsolved mathematics problems whose solutions will earn you one million US dollars each?',
    'that there are 115,200 solutions to the ménage problem of permuting six female-male couples at a twelve-person table so that men and women alternate and are seated away from their partners?',
    'the Piphilology record (memorizing digits of Pi) is in excess of 67000 as of Apr 2010?',
    'tha work in artificial intelligence makes use of Swarm intelligence, which has foundations in the behavorial examples found in nature of ants, birds, bees, and fish among others?',
    'that it is impossible to trisect a general angle using only a ruler and a compass?',
    'that in a group of 23 people, there is a more than 50% chance that two people share a birthday?',
    'that, according to the pizza theorem, a circular pizza that is sliced off-center into eight equal-angled wedges can still be divided equally between two people?',
    'that an infinite, nonrepeating decimal can be represented using only the number 1 using continued fractions?',
    'that 9814072356 is the largest square number using each of the digits 1, 2, 3, 4, 5, 6, 7, 8, 9, and 0 exactly once?',
    'that outstanding mathematician Grigori Perelman was offered a Fields Medal in 2006, in part for his proof of the Poincaré conjecture, which he declined?',
    'that a ball can be cut up and reassembled into two balls the same size as the original (Banach-Tarski paradox)?',
    'that the largest known prime number is over 22 million digits long?',
    'that it is possible for a three dimensional figure to have a finite volume but infinite surface area? An example of this is Gabriel Horn.',
    'that mathematician Paul Erdős called the Hadwiger conjecture, a still-open generalization of the four-color problem, one of the deepest unsolved problems in graph theory?',
    'that as of April 2010 only 35 even numbers have been found that are not the sum of two primes which are each in a Twin Primes pair?',
    'that Ostomachion is a mathematical treatise attributed to Archimedes on a 14-piece tiling puzzle similar to tangram?'
];

var historyFacts = [
    'that in Mesopotamian mythology, the Apkallu were sent by the god Enki, from Dilmun to teach human beings various aspects of civilization',
    'that Karl Marx theory of historical trajectory attempted to prove the long-term unsustainability of capitalism',
    'that the ancient Roman dancer Galeria Copiola reached the age of 104?',
    'that fish-knives inscribed with Elokeshi name were sold after her husband decapitated her with a fish-knife following her adulterous affair with a Hindu head-priest?',
    'that in 1911, John Gaunt second biplane nearly crashed because a bystander bent the aircraft elevator before a flight?',
    'that in November 1921, the schooner Cymric collided with a tram in Dublin?',
    'that Scandinavian influence in Scotland, still evident today, was probably at its height during the time of Thorfinn the Mighty?',
    'that in medieval art, angels were often depicted wearing feather tights?',
    'that 49% of German military losses happened in the last 10 months of the Second World War in Europe?',
    'that Richard Nixon chose the Wilson desk as his Oval Office desk because he believed it was used by Woodrow Wilson, but it was actually used by Henry Wilson, Vice President under Ulysses S. Grant?',
    'that some of the nominally silver Roman coins from the Bredon Hill Hoard only have a 1% silver content?',
    'that the Soviet Tupolev Tu-142 maritime patrol aircraft was developed in response to the American UGM-27 Polaris submarine-launched ballistic missile?',
    'that Thomas Edison lost a fortune in his ore-milling company, but according to him had a hell of a good time spending it?',
    'that finds unearthed at the Israelite Tower in Jerusalem Jewish Quarter attest to the Babylonian sack of the city in 586 BCE?',
    'that Olympic gold medals have been made out of silver, jade, and glass?',
    'that Carl Sagan worked with the US Air Force on detonating a nuclear device on the Moon?',
    'that tiny Paederus beetles may have caused some of the ten Plagues of Egypt?'
];

var physicsFacts = [
    'that if the galaxy Andromeda were bright enough to be fully visible to the naked eye it would appear six times as wide as our moon?',
    'that Aristotle ideas of physics held that because an object could not move without an immediate source of energy, arrows created a vacuum behind them that pushed them through the air',
    'that every year, the Moon moves 3.82 cm away from Earth?',
    'that your watch would run slower when orbiting a black hole than it would on Earth?',
    'that nuclear fusion reactions are probably occurring at or above the sun photosphere; it is a process called solar surface fusion',
    'that, in the Large Hadron Collider, protons move at 99.9999991% of the speed of light when accelerated to the energy of 7 TeV?',
    'that, at a speed of 299,792,458 m/s, light can travel from the Earth to the Moon in 1.2 seconds?',
    'that the Big Bang was secured as the best theory of origin of the universe by the discovery of the cosmic microwave background radiation in 1964?',
    'that Max Planck created a system of measurement based solely on natural units?',
    'that gravitational tidal accelerations are the result of the curvature of spacetime?',
    'that the blue glow of the Cherenkov effect is due to electrons moving faster than the speed of light in water?',
    'that the impact of a raindrop would be fatal if not for the property of fluid flow known as terminal velocity?',
    'that while Albert Einstein is most famous for his Theory of Relativity, he was awarded the Nobel Prize for his explanation of the photoelectric effect?',
    'that Isaac Newton originally defined force as the rate of change of momentum with respect to time?',
    'that AP Columbae, the closest young star known, formed after the dinosaurs became extinct?',
    'that Mt.Olympus Mons on Mars is the highest peak in the solar system?',
    'that light echoes appear to exceed the speed of light due to simple interstellar illusions?',
    'that lunar lava tubes could provide natural shelters for manned lunar habitats?',
    'that The Man in the Moone, a 1638 book by the English bishop Francis Godwin, is considered one of the first science fiction books?',
    'that the Toronto Magnetic Observatory had to be moved as the University of Toronto electric lighting was interfering with observations?',
    'that British mathematician Margaret Meyer was the first woman to be elected to the Royal Astronomical Society?',
];

var biologyFacts = [
    'that there are ten times as many microbial cells in your body than there are human cells and that the sum of their genomes is 100 times greater than yours?',
    'that a leaf may contain from 45,000 to 60,000 stomata per square inch?',
    'that egg of an ostrich 18 centimeters in diameter is also a single, largest cell?',
    'that the water bear, in theory, could survive the vacuum of space?',
    'that Albert Calmette developed Calmette Serum, the first antivenom developed against snake venom?',
    'that bombardier beetles create an explosive chemical reaction within their own bodies and use it as a defensive mechanism?',
    'that Rhagoletis pomonella (the apple maggot) was an observed instance of speciation in the wild caused by the introduction of apples to America?',
    'that skunks cannot see objects further than three metres away, making them vulnerable to road traffic?',
    'the sea otter often keeps a stone tool in its armpit pouch?',
    'that Dolly the sheep was named after Dolly Parton, because Dolly the sheep was cloned from a mammary cell?',
    'that some cichlid fish, crocodiles and frogs keep their eggs or young in their mouths or stomachs?',
    'that natural selection can sometimes lead to disadvantageous traits, as in intragenomic conflict?',
    'that wildebeest calves can walk within minutes of being born, and after a few days can keep up with the rest of the herd?',
    'that the red blood cells of a camel have an oval shape to facilitate their flow in a dehydrated state?',
    'that the Madagascar hissing cockroach expels air from abdominal breathing pores to create a loud hissing sound?',
    'that a female Western harvest mouse can potentially give birth to as many as forty to sixty offspring in a single year?',
    'that coccolithovirus, a giant double-stranded DNA virus, has 472 protein-coding genes, and is the largest known marine virus by genome?',
    'that casting is the regurgitation of fur, feathers, and other undigestible material by hawks, to clean and empty their crops?',
    'that bay mud is a significant estuarine ecological resource, but went unstudied until humans began building high-rise structures near bays?',
    'that nearly 350,000 metric tons of Pacific ocean perch were caught in the Gulf of Alaska by Soviet and Japanese trawling fleets in 1965?',
    'that the native fauna of New Guinea does not include any large mammal predators?'
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