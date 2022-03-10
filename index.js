const express = require("express");
const app = express();
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

// this part gets the URL and parses the parameters from the query string
app.get("/items", (request, response) => {
  // printing the query object to console just to see if it's correct
  console.log(JSON.stringify(request.query));

  // saving query params in variables
  let uuid = request.query.uuid;
  let countrycode = request.query.countrycode;
  let order = request.query.orderID;

  response.send(
    "UUID is " +
      uuid +
      " countrycode is " +
      countrycode +
      " order type is " +
      order
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
