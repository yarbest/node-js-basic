import http from 'http';

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

export const getUsers = (request: http.IncomingMessage, response: http.ServerResponse) => {
  if(request.params.id) {
    const user = users.find((user) => user.id === Number(request.params.id))
    if(user) return response.send(user);
  }
  response.send(users);
}

export const createUser = (request: http.IncomingMessage, response: http.ServerResponse) => {
  const newUser = { id: users.length + 1, name: request.body.name }
  users.push(newUser);
  response.send(newUser);
}