require('dotenv').config()
const {ApolloServer} = require("apollo-server");
const typeDefs = require('../client/schema');
const resolvers = require('../client/resolvers');
require('../client/mongoose');

const context = async ({ req }) => {
  let token = '';
  if(req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  return {
    token
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});