const Artisan = require('../models/artisan');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { cidade, bairro } = req.query;

    let params = {}

    if(cidade){
      params.city = new RegExp(".*"+cidade+".*", "i")
    }
    
    if(bairro){
      params.bairro = new RegExp(".*"+bairro+".*", "i")
    }      

    const artisan = await Artisan.find({
      $or: [params],
      $and: [{
        "status": "aprovado"
      }]
    });
      
    return res.json({ artisan })
  }
}
