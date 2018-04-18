'use strict'

const Car = require('../models/car')

function getCar (req, res) {
    let carId = req.params.CarId

    Car.findById(CarId, (err, Car) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Car) return res.status(404).send({message: `El Coche no existe`})

        res.status(200).send({ Car })
    })
}

function getCars (req, res) {
    Car.find({}, (err, Cars) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!Cars) return res.status(404).send({message: 'No existen Coches'})

        res.send(200, { Cars })
    })
}

function saveCar (req, res) {
    console.log('POST /api/Car')
    console.log(req.body)

    let Car = new Car()
    Car.name = req.body.name
    Car.picture = req.body.picture
    Car.price = req.body.price
    Car.category = req.body.category
    Car.description = req.body.description

    Car.save((err, CarStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

        res.status(200).send({ Car: CarStored })
    })
}

function updateCar (req, res) {
    let CarId = req.params.CarId
    let update = req.body

    Car.findByIdAndUpdate(CarId, update, (err, CarUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el Caro: ${err}`})

        res.status(200).send({ Car: CarUpdated })
    })
}

function deleteCar (req, res) {
    let CarId = req.params.CarId

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