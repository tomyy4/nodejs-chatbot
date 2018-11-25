var connection = require('../db/db.js');

class BooksRepository {

	getBooks() {
		connection.query("Select * from books", function (err,result){
			if (err) {
				throw err;
			}

			console.log(result);
		});
	}
}



var booksRepo = new BooksRepository();
