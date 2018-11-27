var authorsService = require('../services/authors');

class AuthorsDialog {

	getDialog() {
        return [
    		function(session) {
                var authorMessage = "Authors <br>";
                authorMessage += "---------";
                authorMessage += "<br>";
            	authorsService.getAllAuthors(function(err,result) {
                	var i = 0;
                	for (i; i < result.length; i++) {
                        authorMessage += result[i].name + "<br>";
                    }
                	session.send(authorMessage);
            	});    
            }
        ]
    }
}

module.exports = AuthorsDialog;