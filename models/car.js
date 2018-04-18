'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = Schema({
    name: String,
    Marca: String,
    CV: { type: Number, default: 0 },
    category: { type: String, enum: ['gasolina', 'diesel', 'electrico'] },
    description: String
})

module.exports = mongoose.model('Car', CarSchema)