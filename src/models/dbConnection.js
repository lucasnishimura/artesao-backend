//acesso ao drive de 
var mysql = require('mysql');

exports.dbConnection = class dbConnection {

  async connection() {
    var con = mysql.createConnection({
      host: 'ns166.hostgator.com.br',
      user: 'hinen518_lucas',
      password: 'u6CBEDRO18K_', 
      database: 'hinen518_artesaos'
    });

    return con;
  }

}