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
        .text("How can I help you?")
        .suggestedActions(
        	builder.SuggestedActions.create(
            	session, [
                	builder.CardAction.imBack(session, "Show me the products", "Show me the store"),
                    builder.CardAction.imBack(session, "I want to send a gift", "I'd like to send a gift"),
                    builder.CardAction.imBack(session, "goodbye", "Not now, thank you")
                ]
            ));
        session.send(msg);
        session.endDialog();
    }
]).triggerAction({matches:/^Hello$|hi$/i});

/*
Goodbye dialog
*/

bot.dialog('goodbyeDialog', [
	function(session) {
		session.endDialog("See ya!");
	}
]).triggerAction({matches:/^goodbye|bye$/i});

/*
Consult something dialog
*/


//consult phrases

bot.dialog('consultSomething', [
	function(session) {
		session.send("Triggering dialog consult something");
		session.beginDialog("anythingElseDialog");
	}
]).triggerAction({matches:/^Show.*me.*the.*products$/i});

/*
send a gift to someone dialog
*/

bot.dialog('sendAGiftDialog', [
	function(session) {
		session.send("Triggering send a gift dialog");
		session.beginDialog("anythingElseDialog");
	}
]).triggerAction({matches:/^I.*want.*to.*send.*a.*gift$|gift$/i});


/*
Insults dialog
*/

bot.dialog('insultsDialog', [
	function(session) {
		session.send("Hey! Don't mess up with me! I have feelings too :(");
	}
]).triggerAction({matches:/^idiot$|stupid$|asshole$/i});

/*
Anything else dialog
*/

bot.dialog('anythingElseDialog', [
	function(session) {
		builder.Prompts.choice(session,"Is there anything else I can do for you?", "Yes|No",{ listStyle: 3 });
	},
	function(session,results) {
		if (results.response.index === 0) {
			session.beginDialog('initialDialog');
		} else {
			session.beginDialog('goodbyeDialog');
		}

	}
]);
