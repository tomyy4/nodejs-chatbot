var connection = require('../db/db.js');

class BooksRepository {

	getBooks(callback) {
		var books = [];
		connection.query("Select * from books", function (err,result){
			if (err) {
				throw err;
			}
			if (result) {
				for(var i = 0; i<result.length; i++ ){     
                    books.push(result[i]);
        		}
			}
			callback(null,books);
			//console.log(result);
		});
	}
}



module.exports = BooksRepository;