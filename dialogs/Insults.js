

class InsultsDialog {

	getDialog() {
		return [
			function(session) {
				session.send("Hey! Don't mess up with me! I have feelings too :(");
	        	session.endDialog();
			}
		]
	}
}

module.exports = InsultsDialog;