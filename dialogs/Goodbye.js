

class GoodbyeDialog {

	constructor(session) {
		this.session = session;
	}

	getDialog() {
		return [
			function(session) {
				session.endDialog('see ya');
			}
		];
	}
}

module.exports = GoodbyeDialog;