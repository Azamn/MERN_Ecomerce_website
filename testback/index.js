const express = require("express");

const app = express();

// define port

const port = 5000;


const home = (req, res) => {
    return res.send("This is Home Dashboard");
};

const admin = (req, res) => {
    return res.send("This is Admin Dashboard");
};


app.get("/", home);

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running");
    next();
};

const isLoggedIn = (req,res,next) => {
    console.log("user is logged in");
    next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);


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