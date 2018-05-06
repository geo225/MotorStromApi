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
            return res.status(201).send({token: service.createToken(user)});
        }
    });
}

function getUsers(req, res) {
    User.find({}, (err, Users) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Users) return res.status(404).send({message: 'No existen Usuarios'})
        res.status(200).send({Users})
    })
}

function signIn(req, res) {
    console.log('signIn', req.body.email);
    if (req.body.email && req.body.password) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (user !== null) {
                var validPass = user.validPassword(req.body.password);
                if (err) {
                    return res.status(500).send({message: err});
                }
                if (!validPass) {
                    return res.status(403).send({message: 'Password error'});
                } else {
                    req.user = user;
                    res.status(200).send({
                        message: 'Login OK',
                        email: req.body.email,
                        token: service.createToken(user)
                    });
                }
            }
            else{
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
    getUsers
}