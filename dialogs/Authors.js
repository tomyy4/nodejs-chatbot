var builder = require('botbuilder');
var authorsService = require('../services/authors');

class AuthorsDialog {


	getDialog() {
        return [
    		function(session) {
                session.send("Authors:");
                var authorMessage = "";
            	authorsService.getAllAuthors(function(err,result) {
                	var i = 1;
                	for (i; i < result.length; i++) {
                        authorMessage += result[i].name + ". Country: " + result[i].country + ". Born: " + result[i].date_of_birth + "<br>";
                    }
                	session.send(authorMessage);
            	});    
            }
        ]
    }
}

module.exports = AuthorsDialog;