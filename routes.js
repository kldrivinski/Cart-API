const express = require("express");
const pool = require("./connection");
// create a router to handle the fish related URLs (anything with /fish)
const cartRoutes = express.Router();


cartRoutes.get("/", (req, res) => {
    res.send("visit /cart-items to view the cart items!")
});


// GET / display the cart-items
cartRoutes.get("/cart-items", (req, res) => {
    let sql = "SELECT * FROM shopping_cart";
    pool.query(sql).then(result => {
        console.log(result.rows);
        res.json(result.rows);
    })

});

// GET / display the cart-items by specific ID
cartRoutes.get("/cart-items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let params = [id];
    let sql = "SELECT * FROM shopping_cart WHERE id = $1::int";
    pool.query(sql, params).then(result => {
        if (result.rows.length !== 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404);
            res.send("No item found");
        }
    })

});


// POST / post to the DB API

cartRoutes.post("/cart-items", (req, res) => {
    const item = req.body;
    let sql = `INSERT into shopping_cart (product, price, quantity)
        VALUES ($1::text, $2::int, $3::int) RETURNING *`;
    let params = [item.product, item.price, item.quantity];
    pool.query(sql, params).then(result => {
        res.status(201);
        res.json(result.rows[0])
    });

});




// PUT / update items in the DB
cartRoutes.put("/cart-items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = req.body;
    const sql = `UPDATE shopping_cart
                SET product=$1::text, price=$2::int, quantity=$3::int
                WHERE id=$4::INT RETURNING *`;
    const params = [item.product, item.price, item.quantity, id];

    pool.query(sql, params).then(result => {
        res.status(200);
        res.send(result.rows[0]);
    });

});





// DELETE / remove items from the DB
cartRoutes.delete("/cart-items/:id", (req, res) => {
    // puts the id from the request into a paramter
    const id = parseInt(req.params.id);
    const params = [id];
    let sql = "DELETE from shopping_cart WHERE id = $1::int";
    pool.query(sql, params).then(result => {
        res.status(204);
        res.send();
    })


});


module.exports = cartRoutes;
