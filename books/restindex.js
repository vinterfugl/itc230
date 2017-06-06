'use strict'
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: "main"}));
app.set("view engine", ".html");

let http = require("http"),
    fs = require('fs'),
    qs = require('querystring'),
    libFunctions = require('./library/books');

let Book = require("./models/books");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true})); 
app.use('/api', require('cors')());

app.get('/books', (req,res) => {
		
	Book.find(function(err, books){
		console.log(books);
		if(err) return res.status(500).send('Error occurred: database error.');
		res.json(books.map(function(a){
			return {
				title: a.title,
				author: a.author,
				pubdate: a.pubdate,
			}
		}));
	});
});


app.get('/book/:title', (req, res, next) => {
	
	let title = req.params.title;
	
	Book.find((err, books) => {
		let info = books.filter(function( obj ) {
			return obj.title == title;
		});
		console.log(info);
		
		if (info.length < 1) return next();
		res.json(info.map(function(a){
			return {
				title: a.title,
				author: a.author,
				pubdate: a.pubdate,
			};
		}));
	
	});
		
});




/*

app.get('/', (req,res) => {
	Book.find((err,books) => {
		if (err) return next(err);
		let allData = {
			books: books.map
			(function(book){
				return {
					title: book.title,
					author: book.author,
					pubdate: book.pubdate,
				}
			})
		};
		let allBooks = allData.books;
		res.locals.allBooks = allBooks;
		res.render('home', allBooks);
	})
});

app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

app.get('/get', function(req,res){
	Book.find({"title": (req.query.title)}, function(err, item) {
		if(err) return next(err);
		let result = item[0];
		console.log(result);
		res.render('details', {title: req.query.title, result: result });
	})
});

app.get('/add', function(req,res){
	let result = req.query.title;
    console.log(result);
	let newBook = Book({
		title: result
	});
	newBook.save(function(err) {
		if(err) throw err;
		
		console.log("Book added!");
		res.render('added', {title: req.query.title, result: result});
	});
});

app.post('/delete', function(req,res){
	let title = req.body.title;
	Book.remove({ title: req.body.title }, function(err) {
		if (err) throw err;
		res.render('deleted', {title});
	});
});


*/

app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});