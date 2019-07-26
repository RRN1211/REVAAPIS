const sgMail =  require('@sendgrid/mail');
const _config = require('../_config');
const mailjet = require ('node-mailjet')
.connect(_config.MJ_APIKEY_PUBLIC, _config.MJ_APIKEY_PRIVATE);
//establecer conexion con la api key
sgMail.setApiKey(_config.SENDGRID_APIKEY);

async function send(msg){
    msg['from'] = _config.SENDER_MAIL;
    return new Promise((res,rej) => { mailjet
    .post("send", {version: 'v3.1'})
    .request({
        "Messages":[
                {
                "From": {
                        "Email": msg.from,
                        "Name": "Correo registrado"
                },
                "To": [
                        {
                        "Email": msg.to,
                        "Name": msg.name
                        }
                ],
                "Subject": `${msg.subject}`,
                "TextPart": `${msg.text}`,
                "HTMLPart": msg.html
                }
        ]
    })
    .then((result) => {
        res({
          message: "Se envió",
          result: result
        });
    })
    .catch((error)=> {
     
      res({
        
        
          message: "Falla!",
          result: error
      });
    });
  });
}

module.exports.send = send;