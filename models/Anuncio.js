'use strict';

const mongoose = require('mongoose');

// primero definimos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: { type: Boolean},
    precio: { type: Number},
    foto: { type: String},
    tags: {type: String}
});

// creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportamos el modelo
module.exports = Anuncio;