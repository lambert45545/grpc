const PROTO_PATH = "gestionCommande.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).gestionCommande;
const client = new orderProto.GestionCommandeService(
  "127.0.0.1:30044",
  grpc.credentials.createInsecure()
);

module.exports = client;
