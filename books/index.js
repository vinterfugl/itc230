'use strict'
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extername: '.html'}));
app.set("view engine", ".html");

let http = require("http"),
    fs = require('fs'),
    qs = require('querystring'),
    books = require('./public/books');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true})); 

app.get('/', function(req,res){
    res.render('home');
});

app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

app.get('/get', function(req,res){
   // res.send('search: ' + req.query['title']);
    let result = books.get(req.query.title);
    console.log(req.query.title);
    res.render('details', {title: req.query.title, result: result })
});

/*app.post('/delete', function(req,res){
    //console.log(books.counter() + " books left");
    //let deleted = books.get(req.name);
    console.log(req); 
    
    //books.cut(books.get(title));
    //res.end(books.get(title) + " deleted");
    
    /*res.writeHead(200, {'Content-Type': 'text/plain'});
            if (books.get(params.title) == undefined) {
                res.end("Cannot delete " + params.title + ", file cannot be found")
            } else {
                books.cut(params.title);
                res.end(params.title + " deleted. " + books.counter() + " books remaining.")
            };
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