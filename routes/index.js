'use strict'

const express = require('express')
const cors = require('cors')
const carCtrl = require('../controllers/car')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/car',cors(), carCtrl.getCars)
api.get('/car/:carId',cors(), carCtrl.getCar)
api.post('/car',cors(), carCtrl.saveCar)
api.put('/car/:carId',cors(), carCtrl.updateCar)
api.delete('/car/:carId',cors(), carCtrl.deleteCar)
api.post('/signup',cors(), userCtrl.signUp)
api.post('/signin',cors(), userCtrl.signIn)
api.get('/private', cors(),auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api;