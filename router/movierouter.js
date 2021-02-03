//express
const router = require('express').Router()
const {body} = require('express-validator')

//controller
const {usercontroller}= require('../controller')

//create router

router.get('/movies/get/all', usercontroller.getAllMovie)
router.get('/movies/upcoming', usercontroller.getmovieupcoming)
router.get('/movies/showing', usercontroller.getmovieshowing)
router.post('/movies/add', usercontroller.postmovies)
router.patch('/movies/statustoupcoming', usercontroller.changetoupcomingmovies)
router.patch('/movies/statustoshowing', usercontroller.changestoshowingmovies)

//export router
module.exports = router