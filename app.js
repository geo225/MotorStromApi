'use strict'

const express = require('express')
const formData = require("express-form-data");
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

const options = {
    uploadDir: './images',
    autoClean: true
};
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// parse data with connect-multiparty.
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// change file objects to stream.Readable
app.use(formData.stream());
// union body and files
app.use(formData.union());
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api/v1', api)
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/', (req, res) => {
    res.render('car')
})

module.exports = app