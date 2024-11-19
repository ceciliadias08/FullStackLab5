
//imports and initializations
const express = require("express")
const server = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
// const Producct = require("./models/product");
const Product = require("./models/product");
require("dotenv").config();
const {DB_URI} = process.env;

//Middleware
server.use(express.json())
server.use(cors())
server.use(express.urlencoded({extended: true}));


//DB connect and server start
mongoose
    .connect(DB_URI)
    .then((res)=>{
    server.listen(port, () =>{
        console.log(`DB connected...\nServer is listening on ${port}`);
    })
})
.catch ((error)=> {
    console.log(error.message)

});

//routing
server.get("/", (request, response) => {
    response.send("LIVE!");
});

server.get("/products", async(resquest, response) => {
    try {
        await Product.find().then((result) => {
            console.log(result)
            response.send(result)
        })
    }catch (error){
        console.log(error.message);
    }
})
