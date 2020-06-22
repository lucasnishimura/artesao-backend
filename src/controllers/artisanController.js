const Artisan = require('../models/artisan');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const artisan = await Artisan.find();

    return res.json(artisan);
  },

  async store(req, res) {
    const { name, cellphone, telephone, email, empresa, site, facebook, instagram, products, city, bairro, indicate } = req.body;

    let url_intagram = await validate(instagram);
    let url_facebook = await validate(facebook);

    if(!url_intagram){
      return res.status(400).json({message: `Rede social inválida: ${instagram}`});
    }
    
    if(!url_facebook){
      return res.status(400).json({message: `Rede social inválida: ${facebook}`});
    }

    let artisan = await Artisan.findOne({ email });
    
    if(artisan){
      return res.status(400).json({message: 'Usuário já está cadastrado'});
    }
    
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
    if(!regex.exec(email)){
      return res.status(400).json({message: 'Email inválido'});
    }
    
    if (!artisan) {
      artisan = await Artisan.create({
          name: name,
          status: "pendente",
          cellphone: cellphone,
          telephone: telephone,
          email: email,
          empresa: empresa,
          site: site,
          facebook: facebook,
          instagram: instagram,
          products: products,
          city: city,
          bairro: bairro,
          indicate: indicate
      });
    }

    return res.json(artisan);
  },

  async aproveAll(req, res){
    let artisan = await Artisan.updateMany({"status": "pendente"}, {"$set":{"status": "aprovado"}}, {"multi": true})
    return res.json({message: 'Registros aprovados'})
  }
};

async function validate(value){
  let base_url = value.split('/')
  if(base_url[0] != 'www.facebook.com' && base_url[0] != 'www.instagram.com'){
    return false;
  }
  return true;
}