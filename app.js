/**
 * Created by Alfano on 7/9/15.
 */
var http = require('http'),
  router = require('./router.js'),
  url = require('url');
var NodeSession = require('node-session'),
  session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'})

var server = http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
    return
  }
  session.startSession(req, res, function () {
    var path = url.parse(req.url).pathname;
    var currentRoute = router.match(path);
    if (!currentRoute) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('404');
    } else {
      currentRoute.fn(req, res, currentRoute);
    }
  });

});

server.listen(8080, function (err) {
  if (err) console.log('Doah', err);
  console.log('Woot. A server is running on port 8080')
});


