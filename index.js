var restify = require('restify');
var builder = require('botbuilder');

// Create bot and add dialogs
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});



var bot = new builder.UniversalBot(connector);  

/*
Bot starts conversation
*/
bot.on('conversationUpdate', function (activity) {
    if (activity.membersAdded) {
        activity.membersAdded.forEach(function (identity) {
            if (identity.id === activity.address.bot.id) {
            	console.log(" identity :" +identity.id);
            	console.log("members added :" + activity.membersAdded);
                var reply = new builder.Message()
                    .text("Hello! Welcome to Tomeu's store")
                    .address(activity.address)
                bot.send(reply);
              
            }
        });
    }
});



/*
Initial dialog
*/

bot.dialog('initialDialog', [
    function(session) {
        var msg = new builder.Message(session)
        .text("Hi! How can I help you")
        .suggestedActions(
        	builder.SuggestedActions.create(
            	session, [
                	builder.CardAction.imBack(session, "Show me something", "consult"),
                    builder.CardAction.imBack(session, "I want to send a gift", "gift"),
                    builder.CardAction.imBack(session, "goodbye", "goodbye")
                ]
            ));
        session.send(msg);
        session.endDialog();
    }
]).triggerAction({matches:/^Hello/i});

/*

*/

bot.dialog('goodbyeDialog', [
	function(session) {
		session.endDialog("See ya!");
	}
]).triggerAction({matches:/^goodbye/i});

/*
Consult something dialog
*/

bot.dialog('consultSomething', [
	function(session) {
		session.send("Triggering dialog consult something");
	}
]).triggerAction({matches:/^Show.*me.*the.*products$/i});

/*
send a gift to someone dialog
*/

bot.dialog('sendAGiftDialog', [
	function(session) {
		session.send("Triggering send a gift dialog");
	}
]).triggerAction({matches:/^I.*want.*to.*send.*a.*gift$/i});








