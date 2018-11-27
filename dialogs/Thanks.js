

class ThankYouDialog {

	getDialog() {
		return [
			function(session) {
				session.send("You're Welcome :). I'm here to help you");
				session.endDialog();
			}
		]
	}
}

module.exports = ThankYouDialog;