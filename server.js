var http     = require('http'),
    fs       = require('fs'),
    director = require('director');

var router = new director.http.Router();

var server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }

    console.log('Served ' + req.url);
  });
});

router.get(/\//, function () {
  var self = this;
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile('./public/index.html', function (err, data) {
    if (!err) {
      self.res.end(data);
    }
  });
});


router.listen = 8080;

server.listen(router.listen);
console.log('HTTP server with director running on %s', router.listen);
