const ArtisanModel = require('../models/artisanModel');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { city } = req.params;
    const cities = [];

    const citiesQuery = await ArtisanModel.findAll({
      attributes: ['bairro'],
      where: {
        city: {
          [Op.like]: `%${city}%`
        }
      }
    });

    citiesQuery.map((e) => {
      cities.push(e.bairro)
    })

    return res.json({"artisan": cities})
  }
}
