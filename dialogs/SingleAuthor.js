
class SingleAuthorDialog {

	getDialog(){
		return [
			function(session) {
	                builder.Prompts.text(session,"Which author?");
	            },
	            function(session,results) {
	                var res = results.response;
	                request('http://localhost/bookstore/public/authors/author/' + res, (error,response,body) => {
	                    if (body) {
	                        var parsed = JSON.parse(body);
	                        var card = utilities.getAuthorCard(session,parsed.name,parsed.biography,parsed.date_of_birth,parsed.country);
	                        //session.send("yeah! we have books from " + parsed.name);
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