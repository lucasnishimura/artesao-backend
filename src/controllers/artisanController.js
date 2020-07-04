const Artisan = require('../models/artisan');
const { dbConnection } = require('../models/dbConnection');
const { ArtisanModel } = require('../models/artisanModel');

module.exports = {
  async index(req, res) {
    const exem = new dbConnection();
    const conn = await exem.connection();
    
    let createArtisan = new ArtisanModel(conn);

    await createArtisan.getAll(async (err, results) => {
      return res.json(results);
    })
  },

  async store(req, res) {
    const { name, cellphone, telephone, email, empresa, site, facebook, instagram, products, city, bairro, indicate } = req.body;

    var dados_form = {
      "name": name,
      "cellphone": cellphone,
      "telephone": telephone,
      "email": email,
      "empresa": empresa,
      "site": site,
      "facebook": facebook,
      "instagram": instagram,
      "city": city,
      "bairro": bairro,
      "status": "pendente"
    };
    
    const exem = new dbConnection();
    const conn = await exem.connection();
    
    let createArtisan = new ArtisanModel(conn);

    await createArtisan.getArtisan(email, async (err, results) => {
      if(results.length > 0){
        return res.json(results);
      }else{
        await createArtisan.store(dados_form, async (err, results) => {
          if(err) return err;
          if(indicate != undefined){
            indicate.artisan_id = results.insertId;
            await createArtisan.addIndicate(indicate)
          }
          await createArtisan.addProducts(results.insertId, products)
    
          return res.json(dados_form);
        })
      }
    });
  },

  async aproveAll(req, res){
    const exem = new dbConnection();
    const conn = await exem.connection();
    
    let createArtisan = new ArtisanModel(conn);

    await createArtisan.aproveAll(async (err, results) => {
      return res.json({message: 'Registros aprovados'})
    })
  }
};