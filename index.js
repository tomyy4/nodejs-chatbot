var restify = require('restify');
var builder = require('botbuilder');
var BooksRepository = require('./repositories/BooksRepository.js');

var Utils = require('./utils/Utils');
var utils = new Utils();

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


var insultsRegexp = require('./intelligence/insults.js');
var greetingsRegexp = require('./intelligence/greetings.js');
var farewellRegexp = require('./intelligence/farewell.js');
console.log(insultsRegexp);
console.log(greetingsRegexp);
console.log(farewellRegexp);

/*
Repos
*/

var booksRepo = new BooksRepository();
/*
Dialog calls
*/

//bot.dialog("goodbyeDialog",goodbyeDialog.getDialog()).triggerAction({matches:/^goodbye|bye$/i});

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
                	builder.CardAction.imBack(session, "Show me the books", "Show me the books"),
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
]).triggerAction({matches:farewellRegexp});


/*
Consult something dialog
*/


//consult phrases

function  createHeroCard(session, title, subtitle, img, buttonHref, buttonText) {
    return new builder.HeroCard(session).title(title).subtitle(subtitle).images([builder.CardImage.create(session, img)]).buttons([builder.CardAction.openUrl(session, buttonHref, buttonText)]);
  }

bot.dialog('consultSomething', [
	function(session) {
        var theBooks = [];
		booksRepo.getBooks(function(err,result) { 
            for (var i = 0; i< result.length; i++) {
                theBooks.push(createHeroCard(session,result[i].title,result[i].sinopsis,result[i].img,"","Check"));
            }
            var reply = new builder.Message(session).text("Check the books").attachmentLayout(builder.AttachmentLayout.carousel).attachments(theBooks);
            session.send(reply);
		    //session.beginDialog("anythingElseDialog");
        });
	}
]).triggerAction({matches:/^Show.*me.*the.*books$/i});

/*
send a gift to someone dialog
*/

bot.dialog('sendAGiftDialog', [
	function(session) {
		session.send("Triggering send a gift dialog");
		session.beginDialog("anythingElseDialog");
        session.endDialog();
	}
]).triggerAction({matches:/^I.*want.*to.*send.*a.*gift$|gift$/i});


/*
Insults dialog
*/

bot.dialog('insultsDialog', [
	function(session) {
		session.send("Hey! Don't mess up with me! I have feelings too :(");
        session.endDialog();
	}
]).triggerAction({matches:insultsRegexp});

/*
Anything else dialog
*/


bot.dialog('/', [
    function(session) {
        session.sendTyping();
        setTimeout(function () {
            session.send("Mmm I'm not sure what you meant");
        },1000);
         var msg = new builder.Message(session)
        .text("Perhaps you're looking...")
        .suggestedActions(
            builder.SuggestedActions.create(
                session, [
                    builder.CardAction.imBack(session, "Show me the products", "Show me the store"),
                    builder.CardAction.imBack(session, "I want to send a gift", "I'd like to send a gift"),
                    builder.CardAction.imBack(session, "goodbye", "Not now, thank you")
                ]
            ));
        session.sendTyping();
        setTimeout(function () {
            session.send(msg);
        }, 1000);
        session.endDialog();
    }
]);
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
