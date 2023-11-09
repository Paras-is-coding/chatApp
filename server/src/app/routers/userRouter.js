const userRouter = require('express').Router()
const userCtrl = require('../controller/userController.js')

userRouter.post('/register',userCtrl.register)

module.exports = userRouter