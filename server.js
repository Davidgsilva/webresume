const http = require("http");
const fs = require("fs");

const port = 8080 || process.env.PORT;

var mimeType = {
    "plain": "text/plain",
    "html": "text/html",
    "css": "text/css",
    "jpg": "image/jpeg",
    "png": "image/png",
    "ico": "image/x-icon"
};

http.createServer(function (req, res) {
    // index html
    if (req.url == "/") { 
        req.url = "index.html";
    }
    // create array of strings
    var resources = req.url.split(' ');
    // iterate through array
    for (var i = 0; i < resources.length; i++) {
        // mime extension
        var mime = resources[i].substring(resources[i].indexOf('.')+1);
        if (resources[i].indexOf('/') != -1) {
            resources[i] = resources[i].substring(resources[i].indexOf('/')+1);
        }
        // async read and write data
        fs.readFile(resources[i], function (err, data) {
            if (err) {
                res.writeHead(404, {"Content-Type": mimeType['plain']});
                res.write('404');
                res.end();
            } else {
                res.writeHead(200, {"Content-Type": mimeType[mime]});
                res.write(data);
                res.end();
            }
        });
    }
}).listen(port, function () {
    console.log('server running');
});