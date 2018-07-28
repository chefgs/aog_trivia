'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

var facts = ['First computer called as Analytical Engine, was conceived and designed by Charles Babbage between 1833 and 1871.',
'International Space Station Launched 20 Sep 1998.',
'Pacific Ocean occupies about one-third of the Earth\'s surface,  which is approximately 155 million square kilometers  or 59 million square miles.',
'C language was developed at Bell Laboratories in 1972 by Dennis Ritchie.',
'Nile being the second biggest river in the World running through 6830 Kilo Meter.' 
];

function randomFact(facts)
{
  const arrLength = facts.length;
  return facts[Math.floor(Math.random() * arrLength)];
}

// General facts intent
app.intent('General_facts', (conv) => {
    conv.ask('Here is the General Fact! ' + randomFact(facts) + ' Do you want to hear another fact?');
});

app.intent('General_facts - yes', (conv) => {
    conv.ask('Okay, Here is the Fact! ' + randomFact(facts) + ' Do you want to hear another fact?');
});

app.intent('General_facts - no', (conv) => {
    conv.close('OK, Let us stop here. Fact references taken from Google Search and Wikipedia.');
});


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

