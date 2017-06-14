var mongoose = require('mongoose');
var connectionString = require('../credentials');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };

mongoose.connect(connectionString, options);

var mySchema = mongoose.Schema({
	title: { type: String, required: true },
	author: String,
	count: Number,
	pubdate: Number
});

module.exports = mongoose.model('Book', mySchema);