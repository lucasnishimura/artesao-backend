var nodemailer = require('nodemailer');

module.exports = {
  async index(req, res) {

    const { name, cellphone, telephone, email, city, bairro, text } = req.body;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lucas.rossi.nishimura@gmail.com',
        pass: 'hzahiabuyrvlmtbw'
      }
    });
    
    var mailOptions = {
      from: email,
      to: 'lucas.nishi@hotmail.com',
      subject: 'Duvidas Site Artesão',
      html: `
      <b>Nome: </b>${name}<br>
      <b>Celular: </b>${cellphone}<br>
      <b>Telefone: </b>${telephone}<br>
      <b>Cidade: </b>${city}<br>
      <b>Bairro: </b>${bairro}<br><br>
      <b>Mensagem: </b>${text}<br>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ msg: "Email enviado com sucesso!", info: info.response })
      }
    });
  }
}
