require('dotenv').config();


const mongoose = require("mongoose");               // this is require for mongodb
const express = require("express");                 // This is used for listen the port or everything
const app = express();                              // express is a framework of nodeJs

const bodyParser = require("body-parser");          // it is used for middleware include package
const cookieParser = require("cookie-parser");      // it is used for middleware
const cors = require("cors");                       // it is used for middleware

const authRoutes = require("./routes/auth");


// DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).then(() => {
    console.log("DB CONNECTED");
});

// Middlewears 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes

app.use("/api", authRoutes);

// Port
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port,() => {
    console.log(`app is running at ${port}`);
});