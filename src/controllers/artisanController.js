const Artisan = require('../models/artisan');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const artisan = await Artisan.find();

    return res.json(artisan);
  },

  async store(req, res) {
    const { name, cellphone, telephone, email, products, city, bairro, indicate } = req.body;
    let artisan = await Artisan.findOne({ email });

    if (!artisan) {
      artisan = await Artisan.create({
          name: name,
          status: "pendente",
          cellphone: cellphone,
          telephone: telephone,
          email: email,
          products: products,
          city: city,
          bairro: bairro,
          indicate: indicate
      });
    }

    return res.json(artisan);
  }
};