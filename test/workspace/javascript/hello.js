const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end('안녕하세요! node.js 강의에 오신 것을 환영합니다.\n');
});
server.listen(port, hostname, () => {
  console.log('서버 시작');
  console.log(`Server running at http://${hostname}:${port}/`); // 괄호안은 작은 떠옴표('')가 아니라 (``)임에 주의.
});
