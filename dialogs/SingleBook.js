var request = require('request');
var builder = require('botbuilder');
var Utils = require('../utils/Utils');
var utilities = new Utils();

class SingleBookDialog {

	getDialog() {
		return [
     		function(session) {
                builder.Prompts.text(session,"tell me the book you're looking for");
        	},
            function(session,results) {
                var res = results.response;
                request('http://localhost/bookstore/public/books/book/' + res, (error,response,body) => {
                    if (body) {
                        var parsed = JSON.parse(body);
                        var card = utilities.getCard(session,parsed.title,parsed.sinopsis,parsed.published_in,parsed.img);
                        session.send("yeah! we have the book " + parsed.title);
                        session.send(card);
                    } else {
                        session.send("Uoops...we don't have that book...");
                    }
                });         
            }
		];
	}
}


module.exports = SingleBookDialog;