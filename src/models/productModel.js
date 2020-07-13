const { Sequelize, DataTypes, Model } = require('sequelize');
const ArtisanModel = require('../models/artisanModel');
const sequelize = new Sequelize('hinen518_artesaos', 'hinen518_lucas', 'u6CBEDRO18K_', {
  host: 'ns166.hostgator.com.br',
  dialect: 'mysql'
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50)
  },
  artisan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artisans',
      key: 'id'
    }
  }
});

module.exports = Product;