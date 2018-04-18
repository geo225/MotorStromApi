'use strict'

const express = require('express')
const carCtrl = require('../controllers/car')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/car', auth, carCtrl.getcars)
api.get('/car/:carId', carCtrl.getcar)
api.post('/car', auth, carCtrl.savecar)
api.put('/car/:carId', auth, carCtrl.updatecar)
api.delete('/car/:carId', auth, carCtrl.deletecar)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api