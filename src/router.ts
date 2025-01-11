
import http from 'http';

type Path = '/users' | '/posts'
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Handler = (request: http.IncomingMessage, response: http.ServerResponse) => void

type Endpoints = {
  [P in Path]?: {
    [M in Method]?: Handler
  }
}

class Router {
  endpoints?: Endpoints; 

  request(method: Method = 'GET', path: Path, handler: Handler) {
    if(!this.endpoints) this.endpoints = {};
    if(!this.endpoints[path]) this.endpoints[path] = {};
    
    const endpoint = this.endpoints[path];

    if(endpoint[method]) throw new Error('Method already exists');

    endpoint[method] = handler;
  }


  get(path: Path, handler: Handler) {this.request('GET', path, handler)}
  post(path: Path, handler: Handler) {this.request('POST', path, handler)}
  put(path: Path, handler: Handler) {this.request('PUT', path, handler)}
  delete(path: Path, handler: Handler) {this.request('DELETE', path, handler)}
}

export type RouterType = InstanceType<typeof Router>
export {
  Method,
  Path,
  Router
}