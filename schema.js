const { gql } = require('apollo-server');

const typeDefs = gql`
  type Order {
    id: String!
    customerId: String!
    total: Float!
  }

  type GestionCommande {
    id: String!
    commandName: String!
    description: String!
  }

  type Query {
    getOrder(id: String!): Order
    getGestionCommande(id: String!): GestionCommande
    orders: [Order]
    gestionCommande(id: String!): GestionCommande  # Add this field to the Query type
  }

  type Mutation {
    createOrder(id: String!, customerId: String!, total: Float!): Order
    createGestionCommande(id: String!, commandName: String!, description: String!): GestionCommande
  }
`;

module.exports = typeDefs;
