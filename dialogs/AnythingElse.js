

class AnythingElseDialog {

	getDialog() {
		return [
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
		]
	}

}

module.exports = AnythingElseDialog;