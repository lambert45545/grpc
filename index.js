const client = require("./apiclient");
const commande=require('./apicommandeclient');

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/orders", (req, res) => {
    client.GetOrders(null, (err, data) => {
        if (!err) {
            res.json(data);
        }
        else{
            res.send(err);
        }
    });
});

app.get("/commandes", (req, res) => {
    commande.GetCommandes(null, (err, data) => {
        if (!err) {
            res.json(data);
        }
        else{
            res.send(err);
        }
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});