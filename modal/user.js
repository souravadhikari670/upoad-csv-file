const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    id:{
        type: String
    },
    name:{
        type: String
    },
    course:{
        type: String
    }
})

const thisSchema = mongoose.model('User',mySchema)
module.exports = thisSchema
