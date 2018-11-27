

class GoodbyeDialog {

	constructor(session) {
		this.session = session;
	}

	getDialog() {
		return [
			function(session) {
				session.endDialog('Bye! Hope you see you soon :)');
			}
		];
	}
}

module.exports = GoodbyeDialog;