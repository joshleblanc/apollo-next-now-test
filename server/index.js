require('dotenv').config()
const {ApolloServer} = require("apollo-server");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('./mongoose');

const context = async ({ req }) => {
  return {
    token: req.headers.authorization.split(' ')[1]
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});