const ArtisanModel = require('../models/artisanModel');
const IndicateModel = require('../models/indicateModel');
const ProductModel = require('../models/productModel');

module.exports = {
  async index(req, res) {
    const artisans = await ArtisanModel.findAll()
      .then((done) => {
        return res.json(done);
      });
  },

  async store(req, res) {
    const { name, cellphone, telephone, email, empresa, site, facebook, instagram, products, city, bairro, indicate } = req.body;
    
    if(!products || products.length == 0) return res.status(400).json({message: 'Insira os produtos'});    

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

    const registerUser = await ArtisanModel.create(dados_form)
      .catch((error) => {
        if(error.original.code == 'ER_DUP_ENTRY') return res.status(409).json({message: 'usuario já existente'});    
      })
      
      
      if(indicate != undefined){
        indicate.artisan_id = registerUser.id;
        const registerIndicate = await IndicateModel.create(indicate)
        .catch((error) => {
          console.log(error)
          if(error) return res.status(500).json({message: 'Erro ao cadastrar indicação'});    
        })
      }
      
      products.map(async (element) => {
        const registerProduct = await ProductModel.create({name: element, artisan_id: registerUser.id})
        .catch((error) => {
          if(error) return res.status(500).json({message: 'Erro ao cadastrar produtos'});    
        })
      })

      return res.json(dados_form);
  },

  async aproveAll(req, res){
    await ArtisanModel.update({ status: "aprovado" }, {
      where: {
        status: "pendente"
      }
    })
      .then((done) => {
        return res.json({message: 'Registros aprovados'})
      })
      .catch((error) => {
        return res.json({message: 'Erro ao atualizar'})
      })
  }
};