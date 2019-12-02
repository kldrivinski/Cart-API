// pull in the connection file
const pool = require("./connection");

// create the SQL statement to run
let sql = "SELECT * FROM shopping_cart";

// from the connection file, access the database
// when results arrive, console the rows from the SQL query
// in this case, it's from the flights table
pool.query(sql).then(result => {
    console.log(result.rows);
});