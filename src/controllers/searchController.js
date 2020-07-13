const ArtisanModel = require('../models/artisanModel');
const ProductModel = require('../models/productModel');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { cidade, bairro, product } = req.query;
    
    ArtisanModel.hasMany(ProductModel,{
      foreignKey: 'artisan_id'
    })
    ProductModel.belongsTo(ArtisanModel, {
      foreignKey: 'artisan_id'
    })

    let whereArtisan = {}
    whereArtisan.status = 'aprovado'
    if(cidade){
      whereArtisan.city = {
          [Op.like]: `%${cidade}%`
        }
      }
    
    if(bairro){
      whereArtisan.bairro = {
        [Op.like]: `%${bairro}%`
      }
    }
    
    let whereProduct = {}
    if(product){
      whereProduct = {
        name: {
          [Op.like]: `%${product}%`
        }
      }
    }

    const artisans = await ArtisanModel.findAll({
      where: whereArtisan,
      include: {
        model: ProductModel,
        as: 'Products',
        where: whereProduct
      },
    })

    await artisans.map((e) => {
      const products = [];
      e.Products.map((valor) => {
        products.push(valor.name)
      })
      e.products = products;
    })

    return res.json({ artisans })
  },

  async distinctProducts(req, res){
    const { cidade, bairro } = req.query;
    const products = [];

    ArtisanModel.hasMany(ProductModel,{
      foreignKey: 'artisan_id'
    })
    ProductModel.belongsTo(ArtisanModel, {
      foreignKey: 'artisan_id'
    })

    let whereArtisan = {}
    whereArtisan.status = 'aprovado'
    if(cidade){
      whereArtisan.city = {
          [Op.like]: `%${cidade}%`
        }
      }
    
    if(bairro){
      whereArtisan.bairro = {
        [Op.like]: `%${bairro}%`
      }
    }

    const productsQuery = await ProductModel.findAll({
      attributes: ['name'],
      include: {
        model: ArtisanModel,
        as: 'Artisan',
        where: whereArtisan
      },
      group: ['name']
    })

    productsQuery.map((e) => {
      products.push(e.name)
    })
    return res.json({ products })
  }
}
