const router = require("express").Router()
const downloadController = require("../controller/downloadController")



router.post("/",downloadController.dowloadFile)


module.exports=router