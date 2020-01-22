const express = require('express')
const router = express.Router()
const multer = require('multer')
const CsvReadableStream = require('csv-reader');
const fs = require('fs')

const User = require('../modal/user')

router.get('/', (req,res)=>{
    res.render('home')
})
//configure multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/csvfile/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage })
//upload file
    router.post('/uploadcsv', upload.single('csvfilereader'), (req, res)=>{

    var inputStream = fs.createReadStream('./public/csvfile/'+req.file.filename, 'utf8');
    inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        
            const newUser = new User({
                id:row[0],
                name:row[1],
                course:row[2]
            })
            newUser.save()

    })
    .on('end', function (data) {
        console.log('No more rows!');
    });
    res.redirect('/')
})

module.exports = router