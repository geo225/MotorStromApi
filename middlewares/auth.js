'use strict'

const services = require('../services')

function isAuth (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' })
    }

    const token = req.headers.authorization.split(' ')[1]

    services.decodeToken(token)
        .then(function(response) {
            req.user = response;
            next();
        })
        .catch(function(response){
            res.status(403).send({ message: 'Token Invalid' });
        });
}
function isAdmin (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' })
    }

    const token = req.headers.authorization.split(' ')[1]

    services.isAdmin(token)
        .then(function(response) {
            req.user = response;
            next();
        })
        .catch(function(response){
            res.status(403).send({ message: 'No tienes autorización' });
        });
}

module.exports = {
    isAuth,
    isAdmin
}