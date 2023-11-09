const router = require('express').Router()
const userRouter = require('../app/routers/userRouter.js')

router.use(userRouter)

module.exports = router