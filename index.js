var builder = require('botbuilder');
var server = require('./core/server');
var bot = require('./core/bot');

//BOOTSTRAP
var dialog = require('./bootstrap/require-dialogs.js');
var triggers = require('./bootstrap/dialog-triggers.js');


//BOT STARTS CONVERSATION
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


//TRIGGERS WHEN NO OTHER DIALOG DOES
bot.dialog('/', [
    function(session) {
        session.send("Mmm I'm not sure what you meant");
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
        session.send(msg);
        session.endDialog();
    }
]);



//INSTANCES
var authorsDialog = new dialog.AuthorsDialog();
var booksDialog = new dialog.BooksDialog();
var insultsDialog = new dialog.InsultsDialog();
var initialDialog = new dialog.InitialDialog();
var goodbyeDialog = new dialog.GoodbyeDialog();
var anythingElseDialog = new dialog.AnythingElseDialog();
var singleAuthorDialog = new dialog.SingleAuthorDialog();
var singleBookDialog = new dialog.SingleBookDialog();


//FUNCTION CALLS
bot.dialog('anythingElseDialog',anythingElseDialog.getDialog());
bot.dialog('authorsDialog',authorsDialog.getDialog()).triggerAction({matches:triggers.authorsRegexp});
bot.dialog('booksDialog',booksDialog.getDialog()).triggerAction({matches:triggers.booksRegexp});
bot.dialog('goodbyeDialog',goodbyeDialog.getDialog()).triggerAction({matches:triggers.farewellRegexp});
bot.dialog('initialDialog',initialDialog.getDialog()).triggerAction({matches:triggers.greetingsRegexp});
bot.dialog('insultsDialog',insultsDialog.getDialog()).triggerAction({matches:triggers.insultsRegexp});
bot.dialog('singleAuthorDialog',singleAuthorDialog.getDialog()).triggerAction({matches:triggers.singleAuthorRegexp});
bot.dialog('singleBookDialog',singleBookDialog.getDialog()).triggerAction({matches:triggers.singleBookRegexp});



     






