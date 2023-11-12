const router = require('express').Router()
const messageRouter = require('../app/routers/messageRouter.js')
const userRouter = require('../app/routers/userRouter.js')


router.use(userRouter)
router.use(messageRouter)

module.exports = router