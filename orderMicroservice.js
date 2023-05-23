const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const orderProtoPath = 'order.proto';

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const app = express();

const orderProtoDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const orderProto = grpc.loadPackageDefinition(orderProtoDefinition).order;

const clientOrders = new orderProto.OrderService(
  'localhost:50053',
  grpc.credentials.createInsecure()
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // Attach the gRPC client to the context for use in resolvers
    return {
      clientOrders,
    };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.get('/orders', (req, res) => {
    clientOrders.GetOrders({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.orders);
      }
    });
  });

  app.get('/orders/:id', (req, res) => {
    const id = req.params.id;
    clientOrders.GetOrder({ order_id: id }, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.order);
      }
    });
  });

  app.post('/orders', (req, res) => {
    const { customer_id, products } = req.body;
    const request = {
      customer_id,
      products,
    };

    clientOrders.CreateOrder(request, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.order);
      }
    });
  });

  const port = 3000;
  app.listen({ port }, () => {
    console.log(`API Gateway running at http://localhost:${port}`);
  });
});
