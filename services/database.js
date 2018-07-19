const mysql      = require('mysql')
const db         = require('./../db.json')

var connection = mysql.createConnection({
	host     : db.host,
	user     : db.user,
	password : db.password,
	database : db.database
})


module.exports = {
	'getAllDatabaseTables': getAllDatabaseTables,
}

function getAllDatabaseTables(cb) {
	connection.connect();
	connection.query('SELECT * FROM information_schema.tables', function (error, results, fields) {
		connection.end();
		if (error) return cb(error);
		console.log(fields);
		cb(null, results)
	});
}