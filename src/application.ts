import http from 'http';
import EventEmitter from 'events';

import {Method, Path, RouterType} from './router';

export type Middleware = (req: http.IncomingMessage, res: http.ServerResponse, next?: () => void) => void;

export class Application {
  emitter = new EventEmitter();
  server = this._createServer();
  middleWares: Middleware[] = [] 

  addMiddleWare(middleWare: Middleware) {
    this.middleWares.push(middleWare);
  }

  listen(port: number, cb: () => void) {
    this.server.listen(port, cb);
  }

  addRouter(router: RouterType) {
    if(!router.endpoints) return
    
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints?.[path as Path];
      
      if(!endpoint) return;

      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method as Method];
      
        this.emitter.on(this._getRouteMask(path as Path, method as Method), (req: http.IncomingMessage, res: http.ServerResponse) => {
          handler?.(req, res);
        });
      })
    });
  }

  _createServer() {
    return http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        if(body) req.body = JSON.parse(body);

        this.middleWares.forEach((middleWare) => middleWare(req, res));
        const pathname = req.pathname as Path || '';
        const method = req.method as Method || 'GET';
        
        const isEmitted = this.emitter.emit(this._getRouteMask(pathname, method), req, res);
        if(!isEmitted) res.end('404');
      })
    }
    );
  }

  _getRouteMask(path: Path, method: Method) {
    return `[${path}]:[${method}]`;
  }
}