const express = require("express");
const operation = require("./operation");
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app.get("/", (req, res, next) => {
    res.sendFile(`${__dirname}/calculator.html`);
});

app.post("/result", (req, res, next) => {
  operation.execute(req, res, req.body)
})