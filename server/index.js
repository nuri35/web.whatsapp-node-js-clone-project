const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")
const { Server } = require("socket.io");

require('dotenv').config();
const cookieParser = require('cookie-parser')


app.use(cors()) 

app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))







const serverApp = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})



module.exports = serverApp