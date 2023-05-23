const { Router } = require('express');
const mysql = require("mysql");
const config = require("../config");

const routes = Router();

let connection = mysql.createConnection(config.database);

routes.get("/search", function (req, res) {
  let sql = `select * from entries.entries WHERE word='${req.query.searchinput}';`

  connection.query(sql, (error, results, fields) => {
      if (error) return console.error(error.message);

      res.json({
          status: 200,
          data: results,
      });
  });
})

module.exports = { routes};