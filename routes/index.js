'use strict'

const express = require('express')
const carCtrl = require('../controllers/car')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

var cors = require('cors');
api.use(cors());

api.get('/car', auth, carCtrl.getCars)
api.get('/car/:carId', auth, carCtrl.getCar)
api.post('/car', auth, carCtrl.saveCar)
api.put('/car/:carId', auth, carCtrl.updateCar)
api.delete('/car/:carId', auth, carCtrl.deleteCar)
api.get('/user', userCtrl.getUsers)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api;