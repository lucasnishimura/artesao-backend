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

    let url_intagram = await validate(instagram);
    let url_facebook = await validate(facebook);

    if(!url_intagram){
      return res.status(400).json({message: `Rede social inválida: ${instagram}`});
    }
    
    if(!url_facebook){
      return res.status(400).json({message: `Rede social inválida: ${facebook}`});
    }

    
    const artisan = await ArtisanModel.findOne({ where: { email: email} });
    if(artisan){
      return res.status(400).json({message: 'Usuário já está cadastrado'});
    }
    
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
    if(!regex.exec(email)){
      return res.status(400).json({message: 'Email inválido'});
    }
    
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
        if(error) return res.status(500).json(error);    
      })
      
      
      if(indicate != undefined && registerUser != undefined){
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

async function validate(value){
  let base_url = value.split('/')
  console.log(base_url[0])
  if(base_url[0] == 'https:' || base_url[0] == 'http:'){
    if(base_url[2] != 'www.facebook.com' && base_url[2] != 'www.instagram.com' &&  base_url[2] != 'instagram.com' &&  base_url[2] != 'facebook.com'){
      return false;
    }
  }else{
    if(base_url[0] != 'www.facebook.com' && base_url[0] != 'www.instagram.com' &&  base_url[0] != 'instagram.com' &&  base_url[0] != 'facebook.com'){
      return false;
    }
  }

  return true;
}