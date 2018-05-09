'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')

    app.listen(config.port,'0.0.0.0', () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
})