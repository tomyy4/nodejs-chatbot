
var request = require('request');

var books = {
	getAllBooks: function(callback) {
	    request('http://localhost:8000/api/books', function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	        	var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
	    });		
	},
	getBookById: function(id) {
		request('http://localhost:8000/api/books/' + id, (error,response,body) => {
 			if (!error && response.statusCode == 200) {
 				var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
		});
	}
}

module.exports = books;
