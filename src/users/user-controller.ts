import http from 'http';
import UserModel from './user-model';

export const getUsers = async (request: http.IncomingMessage, response: http.ServerResponse) => {
  let users
  if(request.params.id) {
    users = await UserModel.findById(request.params.id).catch(e => response.end('User not found'));
  }else {
    users = await UserModel.find() 
  }
  
  response.send(users);
}

export const createUser = async (request: http.IncomingMessage, response: http.ServerResponse) => {
  const newUser = await UserModel.create({ name: request.body.name });
  response.send(newUser);
}