'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var Config = require('./config')
var FB = require('./connectors/facebook')
var Bot = require('./bot')

var mongoose = require('mongoose')

// var router = express.Router();
var mongo = require('mongodb')
// var objectId = require('mongodb').ObjectID;
var assert = require('assert')

var url = 'mongodb://localhost:27017/studentdb';

// LETS MAKE A SERVER!
var app = express()


// request.post({
//   method: 'POST',
//   uri: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token=${EAAEIatxxxLUBAC1bCUEm9BlPRveDbEGkvol8jaYoWZAZBripXCHSjNJyEc0DoI5dktda0ym2VZAW5qOIJQM5cIRBUGcraRo3LtTf5q5HEXoIbgG6FxtRYO0hf9D8R0tlyNZC2ah7DiaFuDiZCFfRNnVMxrFKzOGChyDgPh4DiiQZDZD}',
//   qs: {
//     "setting_type":"call_to_actions",
//     "thread_state":"new_thread",
//     "call_to_actions":[{
//       "payload":"USER_DEFINED_PAYLOAD"
//     }]
//   },
//   json: true
// }, (err, res, body) =>{

// });

// request({
//     method: 'POST',
//     uri: 'https://graph.facebook.com/v2.6/me/messages',
//     qs: {
//         access_token: EAAEIatxxxLUBAC1bCUEm9BlPRveDbEGkvol8jaYoWZAZBripXCHSjNJyEc0DoI5dktda0ym2VZAW5qOIJQM5cIRBUGcraRo3LtTf5q5HEXoIbgG6FxtRYO0hf9D8R0tlyNZC2ah7DiaFuDiZCFfRNnVMxrFKzOGChyDgPh4DiiQZDZD
//     },
//     json: {
//         recipient: {
//             id: SENDER_ID
//         },
//         message: {
//             attachment: {
//                 type: "template",
//                 payload: {
//                     template_type: "generic",
//                     elements: {
//                         "title": "Your Title",
//                         "subtitle": "Welcome to my messenger bot",
//                         "setting_type":"greeting",
//                         "greeting":{
//                         "text":"Hi {{user_first_name}}, welcome to this bot."
//                       }
//                     }
//                 }
//             }
//         }
//     }
// }, (err, res, body) => {
//     // Deal with the response
// });

app.set('port', (process.env.PORT) || 5000)
// SPIN UP SERVER
app.listen(app.get('port'), function () {
  console.log('Running on port', app.get('port'))
})
// PARSE THE BODY
app.use(bodyParser.json())


// index page
app.get('/', function (req, res) {
  var resultArray = [];
  res.send('hello world i am a chat bot')
})

// for facebook to verify
app.get('/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong tok')
  // res.send('hello')
})

// to send messages to facebook
app.post('/webhooks', function (req, res) {
  var entry = FB.getMessageEntry(req.body)
  // IS THE ENTRY A VALID MESSAGE?
  if (entry && entry.message) {
    if (entry.message.attachments) {
      // NOT SMART ENOUGH FOR ATTACHMENTS YET
      FB.newMessage(entry.sender.id, "That's interesting!")
    } else {
      // SEND TO BOT FOR PROCESSING
      Bot.read(entry.sender.id, entry.message.text, function (sender, reply) {
        FB.newMessage(sender, reply)
      })
    }
  }

  res.sendStatus(200)



  // if (req.body.object == "page") {
  //   // Iterate over each entry
  //   // There may be multiple entries if batched
  //   req.body.entry.forEach(function(entry) {
  //     // Iterate over each messaging event
  //     entry.messaging.forEach(function(event) {
  //       if (event.postback) {
  //         processPostback(event);
  //       }
  //     });
  //   });

  //   res.sendStatus(200);
  // }

})


function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: FB_PAGE_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
      sendMessage(senderId, {text: message});
    });
  }
}

// sends message to user
function sendMessage(recipientId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: FB_PAGE_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message: message,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}



