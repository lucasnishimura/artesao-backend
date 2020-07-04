const Artisan = require('../models/artisan');
const { dbConnection } = require('../models/dbConnection');
const { RegionModel } = require('../models/regionModel');

module.exports = {
  async index(req, res) {
    const { city } = req.params;
    const cities = [];

    const exem = new dbConnection();
    const conn = await exem.connection();
    
    let getRegion = new RegionModel(conn);

    await getRegion.getBairros(city, async (err, results) => {
      if(results.length) results.map((e) => cities.push(e.bairro))

      return res.json({"artisan": cities});
    })
  }
}
