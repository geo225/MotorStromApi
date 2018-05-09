'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = Schema({
    name: {type: String, lowercase: true },
    Marca: {type: String,lowercase: true },
    CV: { type: Number, default: 0 },
    category: { type: String, enum: ['Gasolina', 'Diesel', 'Electrico'] },
    img: { data: String, contentType: String },
    description: String,
    userEmail: String,
    userId: String
})

module.exports = mongoose.model('Car', CarSchema)