const express = require("express");

const app = express();

// define port

const port = 5000;

app.get("/", (req, res) => {
    return res.send("Home Page");

});


app.get("/login", (req, res) => {
    return res.send("You are visiting login route.");

});

app.get("/signout", (req, res) => {
    return res.send("You are signout.");

});

app.get("/azam", (req, res) => {
    return res.send("He uses insatagram and sanp.");

});

app.get("/hitesh", (req, res) => {
    return res.send("He uses insatagram.");

});


app.listen(port, () => {
    console.log("Server is up and running....!");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))