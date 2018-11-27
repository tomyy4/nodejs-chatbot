var builder = require('botbuilder');
var Utils = require('../utils/Utils');
var books = require('../services/books');
var utilities = new Utils();

class BooksDialog {

    
	getDialog() {
        return [
    		function(session) {
            	var theBooks = [];
            	books.getAllBooks(function(err,result) {
                	var i = 0;
                	for (i; i < result.length; i++) {
                    	theBooks.push(utilities.createHeroCard(session,result[i].title,result[i].sinopsis,result[i].img));
                	}
                	var reply = new builder.Message(session).text("Check the books").attachmentLayout(builder.AttachmentLayout.carousel).attachments(theBooks); 
                	session.send(reply);
            	});
       		}
        ]
	}
}

module.exports = BooksDialog;