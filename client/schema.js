const {gql} = require("apollo-server/dist/index");

const typeDefs = gql`
  type Query {
    hello: String
  },
  type Mutation {
    login(email: String!, password: String!): String!
    register(email: String!, password: String!, confirmPassword: String!): Boolean!
  }
`;

module.exports = typeDefs;