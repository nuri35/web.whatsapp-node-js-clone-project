const router = require("express").Router()
const messengerController = require("../controller/messengerController")

const uploadfiles = require("../middleweare/multer")





router.post("/sendMessage",messengerController.messageSend)
router.get("/getMessage/:id",messengerController.getMessageByUser)
router.post("/imageMessageSend",uploadfiles.single("file"),messengerController.messageSendFile)
router.post("/seenMessage",messengerController.messageSeen)
router.post("/delivaredMessage",messengerController.messageDelivared)
module.exports=router 
