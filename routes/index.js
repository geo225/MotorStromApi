'use strict'

const express = require('express')
const carCtrl = require('../controllers/car')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

var cors = require('cors');
api.use(cors());

api.get('/car',auth.isAuth, carCtrl.getCars)
api.get('/car/:carId', auth.isAuth, carCtrl.getCar)
api.post('/car',auth.isAuth, carCtrl.saveCar)
api.put('/car/:carId', auth.isAuth, carCtrl.updateCar)
api.delete('/car/:carId', auth.isAuth, carCtrl.deleteCar)
api.get('/user',auth.isAdmin, userCtrl.getUsers)
api.put('/user/:userId', auth.isAuth, userCtrl.updateUser)
api.delete('user/:userId', auth.isAuth, userCtrl.deleteUser)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api;