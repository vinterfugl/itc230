var http = require("http"),
    fs = require('fs');
    qs = require('querystring');
    books = require('./public/books');

function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    var url = req.url.split("?");
    var params = qs.parse(url[1]);
    /*console.log(params);*/
    var path = url[0].toLowerCase();
    switch(path) {
        case '/':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/wind.png':
            serveStaticFile(res, '/public/wind.png', 'image/png');
            break;
         case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        case '/search':
            console.log(books.get(params.title));
            res.writeHead(200, {'Content-Type': 'text/plain'});
            if (books.get(params.title) == undefined) {
                res.end("Search for " + params.title + ": No records found");
            } else {
                res.end('Search for ' + params.title + ': ' + JSON.stringify(books.get(params.title)));
                /*res.end('Search page');*/
            }
            break;
         case '/delete':
            console.log(books.counter() + " books left");
            res.writeHead(200, {'Content-Type': 'text/plain'});
            if (books.get(params.title) == undefined) {
                res.end("Cannot delete " + params.title + ", file cannot be found")
            } else {
                books.cut(params.title);
                res.end(params.title + " deleted. " + books.counter() + " books remaining.")
            }
            break;
        case '/add':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            if (params.title == undefined) {
                 res.end('Please enter a title to add');
            } else {
                books.add(params.title);
                console.log(books.get(params.title));
                res.end(params.title + ' was added to the booklist.  List now contains ' + books.counter() + " books.");
            }
            break;
         default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
       
            /*
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;*/
            
    }
}).listen(process.env.PORT || 3000);