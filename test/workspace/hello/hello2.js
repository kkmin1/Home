var http = require("http"); 
var hostname = "127.0.0.1";
var port = 8081;
var server = http.createServer(function (request, response) { 
	// Send the HTTP header 
	//// HTTP Status: 200 : OK 
	// Content Type: text/plain 
response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
// Send the response body as "Hello World" 
response.end('나의 첫 nodejs 예\n'); 
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});