const express = require("express")
require('dotenv').config();
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const MongoStore = require('connect-mongo')
const authrouter = require("./src/router/authRouter") 
const messengerRouter = require("./src/router/messengerRouter") 
const db = require("./src/db/database_config")
const path = require("path")

const passport = require("passport");


db.main()

app.use(session({
    secret:"secret",
    resave: true,
    store: MongoStore.create({ mongoUrl: `mongodb://localhost:${process.env.MONGO_DB_LOCAL}/${process.env.DB_NAME}` }),
    saveUninitialized: true,
    cookie:{

        maxAge:1000 * 60 * 60 * 24 
    }//1 gun

}));


app.use("/files", express.static(path.resolve(__dirname,"./uploads/files")));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({origin:"http://localhost:3000",credentials:true})) 


app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//api
app.use("/auth",authrouter)
app.use("/messenger",messengerRouter)





const serverApp = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})



module.exports = serverApp