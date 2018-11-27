

class ApologyDialog {

	getDialog() {
		return [
			function(session) {
				session.send("Apology accepted ;)");
				session.endDialog();
			}
		];
	}
}

module.exports = ApologyDialog;