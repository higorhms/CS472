var http = require('http');
var MyModule = require('./myModule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + MyModule.myDate());
  res.end();
}).listen(8080);