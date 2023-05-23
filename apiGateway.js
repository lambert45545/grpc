const express = require('express');
const bodyParser = require('body-parser');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
const PORT = 3000;

// gRPC setup
const orderProtoPath = 'order.proto';

const orderProtoDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  arrays:true,
  oneofs: true,
});
const orderProto = grpc.loadPackageDefinition(orderProtoDefinition).order;

const server=new grpc.Server();

const orders=[{id:"1",customer_id:"1",products:[{id:"1",name:"dsjds",price:2}]}];
server.addService(orderProto.OrderService.service,{
 GetOrders:(_,callback)=>{
  callback(null,{orders})
 }
 
})
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server running at http://127.0.0.1:30043");
  server.start();
});
const gestionCommandeProtoPath = 'gestionCommande.proto';
const gestionCommandeProtoDefinition = protoLoader.loadSync(gestionCommandeProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const gestionCommandeProto = grpc.loadPackageDefinition(gestionCommandeProtoDefinition).gestionCommande;

const gestionCommandeService = {
  GetCommande: (call, callback) => {
    const commande = {
      id: call.request.commande_id,
      client_id: 'Example Client',
      produits: [
        {
          id: '1',
          nom: 'Produit 1',
          prix: 9.99,
        },
        {
          id: '2',
          nom: 'Produit 2',
          prix: 19.99,
        },
      ],
    };
    callback(null, { commande });
  },
  GetCommandes: (call, callback) => {
    /*
   
  */;
    const commandes = [
      {
        id: '1',
        client_id: "3",
        produits: [
          {
            id: '1',
            nom: 'Produit 1',
            prix: 9.99,
          },
        ],
      },
      {
        id: '2',
        client_id: "4",
        produits: [
          {
            id: '2',
            nom: 'Produit 2',
            prix: 19.99,
          },
        ],
      },
    ];
    callback(null, { commandes });
  },
};

const server2 = new grpc.Server();
server2.addService(gestionCommandeProto.GestionCommandeService.service, gestionCommandeService);
server2.bindAsync(`127.0.0.1:30044`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }

  console.log(`Server is running on port 30044`);
  server2.start();
});


