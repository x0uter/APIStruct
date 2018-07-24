const async = require('async')
const mysql      = require('mysql')
const db         = require('./../db.json')

var connection = mysql.createConnection({
	host     : db.server,
	user     : db.user,
	password : db.password,
	database : db.database
})


module.exports = {
	'getAllDatabaseTables': getAllDatabaseTables,
}


function getAllDatabaseTables(cb) {
	let tables = []
	connection.query('SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = "'+ db.database +'"', function (error, results, fields) {
		if (error) return cb(error);
		results.forEach((t) => {
			tables.push(t.TABLE_NAME);
		})
		cb(null, tables);
	});
}