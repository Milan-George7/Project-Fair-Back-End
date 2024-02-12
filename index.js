//loads .env file contents into process.env by default
require('dotenv').config()
//import express
const express = require('express')
//import cors
const cors = require('cors')
//importing routes
const router = require('./Routes/routes')
//importing database connection file
require('./DB/connection')

//creating server using express
const pfServer = express()

//use cors inside server for communication
pfServer.use(cors())
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
//this is an application specific middleware
pfServer.use(express.json())
//after allowing cors use the imported router
pfServer.use(router)
//used access files/folder from server
pfServer.use('/uploads',express.static('./uploads'))

//set port number
const PORT = 3000

//hosting server
pfServer.listen(PORT,()=>{
    console.log(`project fair server started at port: ${PORT}`);
})

//resolving request
pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1 style=color:red;>project fair server started!! waiting for client request</h1>")
})
