var builder = require('botbuilder');


class InitialDialog {

	getDialog() {
		return [
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
		]
	}
}

module.exports = InitialDialog;