const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const app = express()

//configure midleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('./public'))
app.use(logger('dev'))
app.set('view engine', 'ejs')

//set server
const port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})

//configure database
const db = require('./db/db').mongoURL
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('Database is connected')
})
.catch((error)=>{
    console.log(error)
})

//require all routes
const api = require('./routes/api')
app.use('/', api)