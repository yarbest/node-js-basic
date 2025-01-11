import http from 'http';

export default function middlewareParseJson(request: http.IncomingMessage, response: http.ServerResponse) {
  response.send = (data) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
  }
} 
