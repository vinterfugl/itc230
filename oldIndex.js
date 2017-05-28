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
//return all records
/*Book.find({}, function (err, items) {
	if (err) return next(err);
	console.log(items.length);
	// other code here thanks alot
});*/

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true})); 

/*app.get('/', function(req,res){
	let allBooks = books.allBooks;
	//console.log(allBooks);
	res.locals.allBooks = allBooks;
    res.render('home');
});*/

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

/*app.get('/get', function(req,res){
   // res.send('search: ' + req.query['title']);
    let result = books.get(req.query.title);
    console.log(req.query.title);
    res.render('details', {title: req.query.title, result: result });
});*/

app.get('/get', function(req,res){
	Book.find({"title": (req.query.title)}, function(err, item) {
		if(err) return next(err);
		let result = item[0];
		console.log(result);
		res.render('details', {title: req.query.title, result: result });
	})
});

/*app.get('/add', function(req,res){
    let result = req.query.title;
    console.log(result);
    books.add(result);
    console.log(books.get(result));
    res.render('added', {title: req.query.title, result: books.get(result) });
});*/

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
	//console.log(req.body.title);
	let title = req.body.title;
	/*Book.find({ title: req.body.title }, function(err, book) {
		if (err) throw err;*/
	
		Book.remove({ title: req.body.title }, function(err) {
			if (err) throw err;
			res.render('deleted', {title});
		});/* {
			if (err) throw err;
			
			console.log("book deleted!" + title);
			res.render('deleted', {title});
		});
	});*/
});

/*app.post('/delete', function(req,res){
    let title = req.body.title;
    books.cut(title);
    console.log(books.counter() + " books left");
    //res.type("text/plain");
    res.render("deleted", {title});
});*/


app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});