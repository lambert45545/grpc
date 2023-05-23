const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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
  getCommande: (call, callback) => {
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
  getCommandes: (call, callback) => {
    const { client_id } = call.request;
    const commandes = [
      {
        id: '1',
        client_id: client_id,
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
        client_id: client_id,
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

const server = new grpc.Server();
server.addService(gestionCommandeProto.GestionCommandeService.service, gestionCommandeService);
const port = 50054;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }

  console.log(`Server is running on port ${port}`);
  server.start();
});
console.log(`Gestion de commande microservice running on port ${port}`);
