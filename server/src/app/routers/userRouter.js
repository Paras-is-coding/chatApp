const userRouter = require('express').Router()
const userCtrl = require('../controller/userController.js')

userRouter.post('/register',userCtrl.register)
userRouter.post('/login',userCtrl.login)
userRouter.post('/setAvatar/:id',userCtrl.setAvatar)
userRouter.get('/allUsers/:id',userCtrl.getAllUsers)

module.exports = userRouter