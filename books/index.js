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
    res.render('details', {title: req.query.title, result: result });
});

app.get('/add', function(req,res){
    let result = req.query.title;
    console.log(result);
    books.add(result);
    console.log(books.get(result));
    res.render('added', {title: req.query.title, result: books.get(result) });
});

app.post('/delete', function(req,res){
    let title = req.body.title;
    console.log(title);
    books.cut(title);
    console.log(books.counter() + " booked left");
    res.type("text/plain");
    res.send(title + " deleted");
});



app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});