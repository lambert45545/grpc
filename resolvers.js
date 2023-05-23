const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const orderProtoPath = 'order.proto';
const gestionCommandeProtoPath = 'gestionCommande.proto';

const orderProtoDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const gestionCommandeProtoDefinition = protoLoader.loadSync(gestionCommandeProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProto = grpc.loadPackageDefinition(orderProtoDefinition).order;
const gestionCommandeProto = grpc.loadPackageDefinition(gestionCommandeProtoDefinition).gestionCommande;

const clientOrders = new orderProto.OrderService('localhost:50053', grpc.credentials.createInsecure());
const clientGestionCommande = new gestionCommandeProto.GestionCommandeService('localhost:50054', grpc.credentials.createInsecure());

const resolvers = {
  Query: {
    getOrder: (parent, { id }, context) => {
      // Resolver logic for getOrder field
    },
    getGestionCommande: (parent, { id }, context) => {
      // Resolver logic for getGestionCommande field
    },
    orders: () => {
      // Resolver logic for orders field
    },
    gestionCommande: (parent, { id }, context) => {
      // Resolver logic for gestionCommande field
    },
  },
  Mutation: {
    createOrder: (parent, { id, customerId, total }, context) => {
      // Resolver logic for createOrder field
    },
    createGestionCommande: (parent, { id, commandName, description }, context) => {
      // Resolver logic for createGestionCommande field
    },
  },
};

module.exports = resolvers;
