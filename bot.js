// 'use strict'

// var Config = require('./config')
// var wit = require('./services/wit').getWit()
// var CronJob = require('cron').CronJob;

// // LETS SAVE USER SESSIONS
// var sessions = {}

// var findOrCreateSession = function (fbid) {
//   var sessionId

//   // DOES USER SESSION ALREADY EXIST?
//   Object.keys(sessions).forEach(k => {
//     if (sessions[k].fbid === fbid) {
//       // YUP
//       sessionId = k
//     }
//   })

//   // No session so we will create one
//   if (!sessionId) {
//     sessionId = new Date().toISOString()
//     sessions[sessionId] = {
//       fbid: fbid,
//       context: {
//         _fbid_: fbid
//       }
//     }
//   }

//   return sessionId
// }



// var user1 = {
// id:'1446643885400279',      //string
// schedule: [{mon:'Toan' ,
// 			time: {hhmm: '18:04',dow: 'wed'}},
// 			{mon:'Ly' ,
// 			time: {hhmm: '10:41',dow: 'mon'}} ]
// }

// var user2 = {
// id:	'1366355130123530',
// schedule: [{mon:'Toan' ,
// 			time: {hhmm: '14:00',dow: 'wed'}},
// 			{mon:'Van' ,
// 			time: {hhmm: '10:40',dow: 'mon'}} ]
// }

// var user_list = [user1,user2]
// console.log(user_list)

// var getScheduleById = function(id) {
// var i;
// for (i = 0;i<user_list.length;i++) {
// if(id === user_list[i].id){
// return user_list[i].schedule;
// }
// }
// }


// var time_to_cron = function(sched_time) {
//  var min_hours_arr = sched_time.time.hhmm.split(':');
//  var dow_cron = "";
// switch(sched_time.time.dow) {
// case 'sun':
// 	dow_cron = '0';
// 	break;
// case 'mon':
// 	dow_cron = '1';
// 	break;
// case 'tue':
// 	dow_cron = '2';
// 	break;
// case 'wed':
// 	dow_cron = '3';
// 	break;
// case 'thu':
// 	dow_cron = '4';
// 	break;
// case 'fri':
// 	dow_cron = '5';
// 	break;
// case 'sat':
// 	dow_cron = '6';
// 	break;
// default:
// 	break;
// }
//  var cron = '00 ' + min_hours_arr[1] + ' ' + min_hours_arr[0] + ' * * ' + dow_cron ;
//  return cron;
// }




// var read = function (sender, message, reply) {
// 	if (message === 'hello') {
// 		// Let's reply back hello
// 		message = 'Hello '+ (sender) + typeof(sender) + ' I am a scheduler chat bot';
// 		reply(sender, message);
// 	}
// 	else if(message === 'start') {
// 		//TODO
// 		//get schedule by senderId
// 		//
// 		var schedule = getScheduleById(sender);
// 		var cron1 = time_to_cron(schedule[1]);
// 		//var cron1 = '* 05 * * * *';

// 		var job1 = new  CronJob(cron1, function() {

//   	message = sender + ' co lich hoc mon ' + schedule[1].mon + 'luc' + schedule[1].time.hhmm;
//   	reply(sender,message);
// 	}, null, true, 'Asia/Ho_Chi_Minh');

// 	}
// 	 else {
// 		// Let's find the user
// 		var sessionId = findOrCreateSession(sender)
// 		// Let's forward the message to the Wit.ai bot engine
// 		// This will run all actions until there are no more actions left to do
// 		wit.runActions(
// 			sessionId, // the user's current session by id
// 			message,  // the user's message
// 			sessions[sessionId].context, // the user's session state
// 			function (error, context) { // callback
// 			if (error) {
// 				console.log('oops!', error)
// 			} else {
// 				// Wit.ai ran all the actions
// 				// Now it needs more messages
// 				console.log('Waiting for further messages')

// 				// Based on the session state, you might want to reset the session
// 				// Example:
// 				// if (context['done']) {
// 				// 	delete sessions[sessionId]
// 				// }

// 				// Updating the user's current session state
// 				sessions[sessionId].context = context
// 			}
// 		})
// 	}
// }



// module.exports = {
// 	findOrCreateSession: findOrCreateSession,
// 	read: read,
// }



'use strict'

var Config = require('./config')
var CronJob = require('cron').CronJob;
var yesno = require('yesno');
var wit = require('./services/wit').getWit()

// LETS SAVE USER SESSIONS
var sessions = {}

var findOrCreateSession = function (fbid) {
  var sessionId

  // DOES USER SESSION ALREADY EXIST?
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // YUP
      sessionId = k
    }
  })

  // No session so we will create one
  if (!sessionId) {
    sessionId = new Date().toISOString()
    sessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }
  }

  return sessionId
}

var user1 = {
id:'1446643885400279',      //string
schedule: [{mon:'Toan' ,
			time: {hhmm: '18:04',dow: 'wed'}},
			{mon:'Ly' ,
			time: {hhmm: '18:05',dow: 'fri'}} ]
}

var user2 = {
id:	'1366355130123530',
schedule: [{mon:'Toan' ,
			time: {hhmm: '14:00',dow: 'wed'}},
			{mon:'Van' ,
			time: {hhmm: '17:57',dow: 'fri'}} ]
}

var user_list = [user1,user2]
console.log(user_list)
var getScheduleById = function(id) {
	var i;
	for (i = 0;i<user_list.length;i++) {
		if(id === user_list[i].id){
		return user_list[i].schedule;
		}
	}
}


var time_to_cron = function(sched_time) {
 var min_hours_arr = sched_time.time.hhmm.split(':');
 var dow_cron = "";
 if(sched_time.time.dow === 'fri'){
 	dow_cron = '5';
 }
 var cron = '00 ' + min_hours_arr[1] + ' ' + min_hours_arr[0] + ' * * ' + dow_cron ;
 return cron;
}



var read = function (sender, message, reply) {
	if (message === 'hello') {
		// Let's reply back hello
		message = 'Hello yourself! I am a chat bot."'
		reply(sender, message)
	} 
	else if(message === 'start') {
		var schedule = getScheduleById(sender);
		var cron1 = time_to_cron(schedule[1]);
		//var cron1 = '* 05 * * * *';

		// var job1 = new  CronJob(cron1, function() {

		//   	message = sender + ' co lich hoc mon ' + schedule[1].mon + 'luc' + schedule[1].time.hhmm;
		//   	reply(sender,message);
		// }, null, true, 'Asia/Ho_Chi_Minh');

		new CronJob('30 * * * * *', function() {

			// yesno.ask('Are you sure you want to continue?', true, function(ok) {
   //  			if(ok) {
   //      			console.log("Yay!");
   //  			} else {
   //      			console.log("Nope.");
   //  			}
			// });

  		message = 'i send this message every 10 second';
  		reply(sender,message);
		}, null, true, 'Asia/Ho_Chi_Minh');
	}
	else {
		// Let's find the user
		var sessionId = findOrCreateSession(sender)
		// Let's forward the message to the Wit.ai bot engine
		// This will run all actions until there are no more actions left to do
		wit.runActions(
			sessionId, // the user's current session by id
			message,  // the user's message
			sessions[sessionId].context, // the user's session state
			function (error, context) { // callback
			if (error) {
				console.log('oops!', error)
			} else {
				// Wit.ai ran all the actions
				// Now it needs more messages
				console.log('Waiting for further messages')

				// Based on the session state, you might want to reset the session
				// Example:
				// if (context['done']) {
				// 	delete sessions[sessionId]
				// }

				// Updating the user's current session state
				sessions[sessionId].context = context
			}
		})
	}
}



module.exports = {
	findOrCreateSession: findOrCreateSession,
	read: read,
}