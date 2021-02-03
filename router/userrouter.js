//express
const router = require('express').Router()
const {body} = require('express-validator')

//controller
const {usercontroller}= require('../controller')

//create router

router.get('/getAllUser', usercontroller.getAllUser)
router.post('/user/register', usercontroller.register)
router.post('/user/login', usercontroller.login)
router.patch('/user/deactive', usercontroller.deactivate)
router.patch('/user/activate', usercontroller.activate)
router.patch('/user/close', usercontroller.closed)

//export router
module.exports = router
