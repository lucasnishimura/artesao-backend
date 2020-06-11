const Artisan = require('../models/artisan');

module.exports = {
  async index(req, res) {
    const { city } = req.params;

    const artisan = await Artisan.distinct('bairro',{city: new RegExp(".*"+city+".*", "i")});
      
    return res.json({ artisan })
  }
}
