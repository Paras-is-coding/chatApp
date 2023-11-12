const messageRouter = require('express').Router()
const messageCtrl = require('../controller/messageController.js')

messageRouter.post("/addmsg",messageCtrl.addMessage)
messageRouter.post("/getmsg",messageCtrl.getAllMessage)

module.exports = messageRouter