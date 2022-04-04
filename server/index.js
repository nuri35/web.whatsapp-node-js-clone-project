const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const cors = require("cors")
require('dotenv').config();
const MongoStore = require('connect-mongo')
const authrouter = require("./src/router/authRouter") 
const db = require("./src/db/database_config")

const passport = require("passport");


db.main()


app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    
  
    store: process.env.NODE_ENV === "production" ? MongoStore.create({mongoUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`}) : "",
    cookie:{
        secure: true,
        maxAge:1000 * 60 * 60 * 24 
    }//1 gun

}));



app.use(passport.initialize());
app.use(passport.session());

app.use(cors({origin:"http://localhost:3000",credentials:true})) 


app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//api
app.use("/auth",authrouter)




const serverApp = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})



module.exports = serverApp