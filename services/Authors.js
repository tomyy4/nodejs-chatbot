var request = require('request');

var authors = {
	getAllAuthors: function(callback) {
	    request('http://localhost/bookstore/public/authors', function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	        	var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
	    });
	},
	getAuthorsBook: function($id) {
		request('http://localhost/bookstore/public/author/' + $id + '/books', (err,response,body) => {
 			if (!error && response.statusCode == 200) {
 				var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
		});
	},
	getAuthorByName: function($name) {
		request('http://localhost/bookstore/public/authors/author/' + $name, (err,response,body) => {
 			if (!error && response.statusCode == 200) {
 				var result = JSON.parse(body);
	            return callback(null, result);
	        } else {            
	            return callback(null, error);
	        }
		});
	}	
}

module.exports = authors;
//authorsAPI.allAuthors();
//authors.authorBooks(2);

// authors.allAuthors(function(err,result) {
// 	console.log(result);

// });