'use strict'

const User = require('../models/user')
const service = require('../services/index')

function signUp (req, res) {
    var user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });
    user.save(function(err){
        if (err) {
            if (err.code === 11000){
                res.status(409).send({message: "Usuario Duplicado"});
            }else{
                res.status(500).send(err);
            }
        } else {
            return res.status(201).send({
                token: service.createToken(user),
                user: user
            });
        }
    });
}
function getUser(req, res) {
    let UserId = req.params.userId
    User.findById(UserId, (err, User) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!User) return res.status(404).send({message: `El Usuario no existe`})

        res.status(200).send({User})
    })
}
function getUsers(req, res) {
    User.find({}, (err, Users) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Users) return res.status(404).send({message: 'No existen Usuarios'})
        res.status(200).send({Users})
    })
}
function updateUser(req, res) {
    let UserId = req.params.userId
    let bodyUpdate = req.body

    User.findById(UserId, (err, User) => {
        if (err) res.status(500).send({message: `Error al Actualizar el Usuario: ${err}`})
        User.set(bodyUpdate)
        User.save(function(err, UserUpdated) {
                if (err) res.status(500).send({message: `Error al actualizar el Usuario: ${err}`})
                res.status(200).send({User: UserUpdated})
        })
    })
}

function deleteUser(req, res) {
    let UserId = req.params.userId

    User.findById(UserId, (err, User) => {
        if (err) res.status(500).send({message: `Error al borrar el Usuario: ${err}`})

        User.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el Usuario: ${err}`})
            res.status(200).send({message: 'El Usuario ha sido eliminado'})
        })
    })
}
function signIn(req, res) {
    if (req.body.email && req.body.password) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (user !== null) {
                var validPass = user.validPassword(req.body.password);
                if (err) {
                    console.log('signIn error ', req.body.email);
                    return res.status(500).send({message: err});
                }
                if (!validPass) {
                    console.log('signIn invalid password ', req.body.email);
                    return res.status(403).send({message: 'Password error'});
                } else {
                    console.log('signIn success ', req.body.email);
                    req.user = user;
                    res.status(200).send({
                        message: 'Login OK',
                        email: req.body.email,
                        token: service.createToken(user),
                        user: user
                    });
                }
            }
            else{
                console.log('signIn error ', req.body.email);
                return res.status(404).send({message: 'User not found'});
            }
        });
    } else {
        res.status(403).send({'message': 'username or password is empty'});
    }
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}