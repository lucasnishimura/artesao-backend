const { Sequelize, DataTypes, Model } = require('sequelize');
const ProductModel = require('../models/productModel');
const sequelize = new Sequelize('hinen518_artesaos', 'hinen518_lucas', 'u6CBEDRO18K_', {
  host: 'ns166.hostgator.com.br',
  dialect: 'mysql'
});

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50)
  },
  cellphone: {
    type: DataTypes.STRING(16)
  },
  telephone: {
    type: DataTypes.STRING(15)
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true
  },
  empresa: {
    type: DataTypes.STRING
  },
  site: {
    type: DataTypes.STRING(50)
  },
  facebook: {
    type: DataTypes.STRING(35)
  },
  instagram: {
    type: DataTypes.STRING(35)
  },
  city: {
    type: DataTypes.STRING(50)
  },
  bairro: {
    type: DataTypes.STRING(50)
  },
  status: {
    type: DataTypes.STRING(9)
  },
});

module.exports = Artisan;