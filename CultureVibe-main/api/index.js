const express = require("express");
const cors = require("cors");
const loisirRoute = require("./routes/route");
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', loisirRoute);

app.listen(8000, function() {
    console.log("serveur sur le port 8000");
});