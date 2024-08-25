const express = require('express');
const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router')


const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use('/users', logger, usersRouter) //place before catchall

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  res.status(404).json({ message: 'this does not exist you messed it up' });
});



module.exports = server;
