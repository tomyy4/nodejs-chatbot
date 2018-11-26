var builder = require('botbuilder');
var Utils = require('../utils/Utils');
var authorsService = require('../services/authors');
var utilities = new Utils();

class AuthorsDialog {


	getDialog() {
        return [
    		function(session) {
            	var allAuthors = [];
            	authorsService.getAllAuthors(function(err,result) {
                	var i = 0;
                	for (i; i < result.length; i++) {
                    	allAuthors.push(utilities.createHeroCard(session,result[i].name,result[i].country,result[i].date_of_birth,"check","check"));
                	}
                	var reply = new builder.Message(session).text("Check the books").attachmentLayout(builder.AttachmentLayout.carousel).attachments(allAuthors);
                	session.send(reply);
            	});    
            }
        ]
    }
}

module.exports = AuthorsDialog;