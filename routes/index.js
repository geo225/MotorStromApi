'use strict'

const express = require('express')
const carCtrl = require('../controllers/car')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/car', carCtrl.getCars)
api.get('/car/:carId', carCtrl.getCar)
api.post('/car', carCtrl.saveCar)
api.put('/car/:carId', carCtrl.updateCar)
api.delete('/car/:carId', carCtrl.deleteCar)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api;