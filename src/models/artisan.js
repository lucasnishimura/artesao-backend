const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const Artisan = new mongoose.Schema({
    name: String,
    cellphone: String,
    telephone: String,
    email: String,
    products: [String],
    city: String,
    bairro: String,
    status: String,
    indicate: {
      name: String,
      email: String,
      cellphone: String,
      telephone: String
    }
})

module.exports = mongoose.model('Artisan', Artisan)