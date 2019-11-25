const express = require("express");


// create a router to handle the fish related URLs (anything with /fish)
const cartRoutes = express.Router();


const cartItems = [
    { id: 1, product: "coffee", price: 5, quantity: 2 },
    { id: 2, product: "tea", price: 4, quantity: 1 },
    { id: 3, product: "juice", price: 2, quantity: 5 }
]

let nextID = 4;

cartRoutes.get("/", (req, res) => {
    res.send("visit /cart-items to view the cart items!")
});

cartRoutes.get("/cart-items", (req, res) => {
    // when the route is visited, the get returns the entire array as a json format
    res.json(cartItems);
    res.status(200);

});


cartRoutes.get("/cart-items/:id", (req, res) => {
    // id will return as a string from the request
    // this converts it to an int
    const id = parseInt(req.params.id);
    // any console logs in the server file will show up where you run it
    // in this case, it will run in the terminal when you go to the uRL
    console.log(id);

    // find a fish with the matching id and put in a variable
    const foundItem = cartItems.find(item => item.id === id);
    // if the foundFish exists
    if (foundItem) {
        // send that object
        res.json(foundItem);
        res.status(200);
    }
    else {
        res.status(404);
        res.send(`ID ${id} Not Found`);
    }

});



cartRoutes.post("/cart-items", (req, res) => {
    // the data is found on the jSON body
    const item = req.body;
    item.id = nextID++;
    cartItems.push(item);


    res.status(201);
    res.json(item);

});


cartRoutes.put("/cart-items/:id", (req, res) => {
    // puts the id from the request in a paramter
    const id = parseInt(req.params.id);
    // puts the object info from the request into a parameter
    const item = req.body;
    // sets the object id to the request id
    item.id = id;
    // Find Index by ID
    // finds the index of the cart item matching the id
    const index = cartItems.findIndex(i => i.id === id);
    // Replace at index
    cartItems.splice(index, 1, item);
    res.json(item);
    res.status(200);
});



cartRoutes.delete("/cart-items/:id", (req, res) => {
    // puts the id from the request into a paramter
    const id = parseInt(req.params.id);
    // sets the index equal to the index of the item matching that id
    const index = cartItems.findIndex(item => item.id === id);
    // If found...(then the index isn't -1)
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    // Set response code to 204. Send no content.
    res.sendStatus(204);
});


module.exports = cartRoutes;
