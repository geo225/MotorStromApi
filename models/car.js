'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = Schema({
    name: {type: String, lowercase: true },
    Marca: {type: String,lowercase: true },
    CV: { type: Number, default: 0 },
    category: { type: String, enum: ['gasolina', 'diesel', 'electrico'] },
    img: { data: Buffer, contentType: String },
    description: String
})

module.exports = mongoose.model('Car', CarSchema)