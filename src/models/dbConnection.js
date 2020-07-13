//acesso ao drive de 
var mysql = require('mysql');
const { Sequelize } = require('sequelize');

module.exports = async function connect() {
  const con = new Sequelize('hinen518_artesaos', 'hinen518_lucas', 'u6CBEDRO18K_', {
    host: 'ns166.hostgator.com.br',
    dialect: 'mysql'
  });

  try {
    await con.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return con;
}