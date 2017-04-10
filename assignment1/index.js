var http = require("http"),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    var path = req.url.toLowerCase();
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
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
            /*
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home Page');
            break;
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