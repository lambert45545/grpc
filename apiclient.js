const PROTO_PATH = "order.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).order;
const client = new orderProto.OrderService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

module.exports = client;
