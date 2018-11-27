var builder = require('botbuilder');

class AnythingElseDialog {

	getDialog() {
		return [
			function(session) {
				builder.Prompts.choice(session,"Is there anything else I can do for you?", "Yes|No",{ listStyle: 3 });
			},
			function(session,results) {
				if (results.response.index === 0) {
					session.beginDialog('initialDialog');
					session.endDialog();
				} 
				if (results.response.index === 1) {
					session.beginDialog('goodbyeDialog');
					session.endDialog();
				}
			}
		]
	}

}

module.exports = AnythingElseDialog;