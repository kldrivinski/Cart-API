// requires the installed pg module
// destructured, only take part of the export from pg called Pool
const { Pool } = require("pg");
// creates credentials as an object of an instance of the class Pool
const credentials = new Pool({
    user: "postgres",
    password: "ksmoots42",
    host: "localhost",
    port: 5432,
    database: "ExpressShopDB", // select the database to use
    ssl: false
});
module.exports = credentials;