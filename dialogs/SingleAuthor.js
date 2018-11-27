var request = require('request');
var builder = require('botbuilder');
var Utils = require('../utils/Utils');
var utilities = new Utils();

class SingleAuthorDialog {

	getDialog(){
		return [
			function(session) {
	                builder.Prompts.text(session,"Write the author's name and I'll look for it");
	        },
	        function(session,results) {
	            var res = results.response;
	        	request('http://localhost/bookstore/public/authors/author/' + res, (error,response,body) => {
	            	if (body) {
	                	var parsed = JSON.parse(body);
	               	    var card = utilities.getAuthorCard(session,parsed.name,parsed.biography,parsed.date_of_birth,parsed.country);
	                    session.send(card);
	                } else {
	                     session.send("Uoops...we don't have any book of this author");
	                }
	            });             
	        }
		];
	}

}

module.exports = SingleAuthorDialog;