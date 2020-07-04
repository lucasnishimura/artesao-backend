const Artisan = require('../models/artisan');
const { dbConnection } = require('../models/dbConnection');
const { SearchModel } = require('../models/searchModel');
// var Promise = require('es6-promise').Promise;

module.exports = {
  async index(req, res) {
    const { cidade, bairro, product } = req.query;
    const artisans = [];

    const exem = new dbConnection();
    const conn = await exem.connection();
    
    let getProducts = new SearchModel(conn);
     
    //alternativa 2
    function getDbArtisans(callback) {
      getProducts.getArtisans(cidade, bairro, product, function (err, result) {
        if(err || !result.length) return callback('error or no results');
        callback(null, result);
      });
    }

    function getProductArtisans(value,callback2) { 
      getProducts.getProductById(value.id, (erro, resultado) => {
        resultado = resultado.map(obj => obj.name);
        callback2(null,resultado)
      });
    }

    function getMap(resultado,callback3){
      resultado.map(async (value, key) => {
        getProductArtisans(value, function(erro, produtos){
          value.products = produtos;
          artisans.push(value)
          if(key == resultado.length - 1) callback3(artisans)        
        })
      })
    
    }
    getDbArtisans(async function(err, resultado){
      getMap(resultado,function(artisans){
        // console.log(artisans)
        return res.json({ artisans })
      });   
    });
  },

  async distinctProducts(req, res){
    const { cidade, bairro } = req.query;

    const exem = new dbConnection();
    const conn = await exem.connection();
    
    let getProducts = new SearchModel(conn);

    await getProducts.getProducts(cidade, bairro, async (err, results) => {
      let products = [];

      results.map((e) => {
        if(!products.includes(e.name)){
          products.push(e.name)
        }
      })

      return res.json({ products })
    })
  }
}
