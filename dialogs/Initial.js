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
                    	builder.CardAction.imBack(session, "Show me the authors", "Show me the authors"),
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