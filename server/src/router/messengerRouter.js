const router = require("express").Router()
const messengerController = require("../controller/messengerController")




router.post("/sendMessage",messengerController.messageSend)
router.get("/getMessage/:id",messengerController.getMessageByUser)
router.post("/imageMessageSend",messengerController.messageSendİmage)

module.exports=router