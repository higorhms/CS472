const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');

const config = require("./config");
const { routes } = require('./routes/routes.js')

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(routes)

app.listen(config.port, () => {
    console.log(`Server started port: ${config.port}`);
})