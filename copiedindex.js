'use strict'

var express = require("express");
var app = express();
var Book = require("./models/books"); //use db model

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use((err, req, res, next) => {
	console.log(err)
})

// set template engine
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
	Book.find((err,books) => {
		if (err) return next(err);
		res.render('home', {books: JSON.stringify(books)});
		console.log(books);
	})
});

app.get('/about', (req,res) => {
	res.type('text/html');
	res.send('about');
});

// api's
app.get('/api/v1/book/:title', (req,res,next) => {
	let title = req.params.title;
	console.log(title);
	Book.findOne({title: title}, (err, result) => {
		if (err || !result) return next(err);
		res.json( result );
	});
});

app.get('/api/v1/books', (req,res,next) => {
	Book.find((err, results) => {
		if (err || !results) return next(err);
		res.json(results);
	});
});
	
	

app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});