var connection = require('../db/db.js');

class AuthorsRepository {


	getAuthors() {
		connection.query("Select * from authors", function (err,result){
			if (err) {
				throw err;
			}

			console.log(result);
		});
	}
}