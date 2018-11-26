
var request = require('request');

var books = {
	getAllBooks: function(callback) {
	    request('http://localhost/bookstore/public/books', function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	        	var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
	    });		
	},
	getBookById: function($id) {
		request('http://localhost/bookstore/public/books/' + $id, (err,response,body) => {
 			if (!error && response.statusCode == 200) {
 				var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
		});
	},
	getBookByName: function($name) {
		request('http://localhost/bookstore/public/books/book/' + $name, (err,response,body) => {
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
