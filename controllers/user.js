'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')
const service = require('../services')

function signUp (req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

        return res.status(201).send({ token: service.createToken(user) })
    })
}
function getUsers (req, res) {
    User.find({}, (err, Users) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Users) return res.status(404).send({message: 'No existen Usuarios'})

        res.status(200).send({ Users })
    })
}

function signIn (req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })
        if (!bcrypt.compare(user.password, req.body.password)) return res.status(401).send({ message: 'Contraseña Incorrecta' });

        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn,
    getUsers
}