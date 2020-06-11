const Artisan = require('../models/artisan');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { cidade, bairro, product } = req.query;

    let params = {}

    if(cidade){
      params.city = new RegExp(".*"+cidade+".*", "i")
    }
    
    if(bairro){
      params.bairro = new RegExp(".*"+bairro+".*", "i")
    }      

    let condition = {
      "status": "aprovado",
    }

    if(product){
      condition.products = {
        $in: new RegExp(".*"+product+".*", "i")
      }
    }

    const artisan = await Artisan.find({
      $or: [params],
      $and: [condition]
    });
  
    return res.json({ artisan })
  },

  async distinctProducts(req, res){
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

    let products = [];

    artisan.map((e) => {
      e.products.map((product) => {
        if(!products.includes(product)){
          products.push(product)
        }
      })
    })

    return res.json({ products })
  }
}
