const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
require('dotenv').config()

// main app
const app = express()

// apply middleware
app.use(cors())
app.use(bodyparser.json())

//mysql setup
const db = require('./database')

db.connect((err)=>{
    if (err) return console.log(`error connecting : ${err.stack}`)
    console.log(`connected as id : ${db.threadId}`)
})

// home
app.get('/', (req, res) => {
    res.status(200).send(`<h1>This is Home</h1>`)
})

//routes
const {userrouter, moviesrouter} = require('./router')
app.use('/user', userrouter)
app.use('/movies', moviesrouter)


// bind to local machine
const PORT = process.env.PORT || 2000
app.listen(PORT, () => `CONNECTED : port ${PORT}`)