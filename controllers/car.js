'use strict'

const Car = require('../models/car')
var fs = require('fs');


var imgPath = '/images/civic.jpg';

function getCar(req, res) {
    let CarId = req.params.carId

    Car.findById(CarId, (err, Car) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Car) return res.status(404).send({message: `El Coche no existe`})

        res.status(200).send({Car})
    })
}

function getCars(req, res) {
    Car.find({}, (err, Cars) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Cars) return res.status(404).send({message: 'No existen Coches'})

        res.status(200).send({Cars})
    })
}

function saveCar(req, res) {
    console.log('POST /api/Car')
    console.log(req.body)
    var base64img = '';
    new Promise(function (full, rej) {
        fs.readFile(req.body.img.path, function (err, data) {
            base64img = new Buffer(data).toString('base64');
            full();
        });
    }).then(function (full) {
        var car = new Car()
        car.name = req.body.name;
        car.Marca = req.body.Marca;
        car.CV = req.body.CV;
        car.category = req.body.category;
        car.description = req.body.description;
        car.img.data = base64img;
        car.img.contentType = 'img/jpg';
        car.save((err, CarStored) => {
            if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

            res.status(200).send({Car: CarStored})
        })
    }).catch(function (rej) {
        console.error(rej);
    });
}

function updateCar(req, res) {
    let CarId = req.params.carId
    let update = req.body

    Car.findByIdAndUpdate(CarId, update, (err, CarUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el Car: ${err}`})

        res.status(200).send({Car: CarUpdated})
    })
}

function deleteCar(req, res) {
    let CarId = req.params.carId

    Car.findById(CarId, (err, Car) => {
        if (err) res.status(500).send({message: `Error al borrar el Coche: ${err}`})

        Car.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el Coche: ${err}`})
            res.status(200).send({message: 'El Coche ha sido eliminado'})
        })
    })
}

module.exports = {
    getCar,
    getCars,
    saveCar,
    updateCar,
    deleteCar
}