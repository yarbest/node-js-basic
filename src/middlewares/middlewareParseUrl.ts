import http from 'http';
import { Path } from '../router';

const parseUrl = (baseUrl: string) => (request: http.IncomingMessage, response: http.ServerResponse, next?: () => void) => {
  const parsed = new URL(request.url || '', baseUrl)
  const params: {[key: string]: string} = {}
  parsed.searchParams.forEach((value, key) => {
    params[key] = value;
  })
  
  request.pathname = parsed.pathname as Path;
  request.params = params;
}

export default parseUrl;