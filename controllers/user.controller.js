const status = require('http-status');
const _config = require('../_config');
const jwt = require('jsonwebtoken');
const mail = require('../utils/sendmail');



let _user;
const createNewUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then(async (data)=> {           
            
            var env = {
              name:data.name,
              to: data.email,
              subject: 'Proyecto U3 - AE2019V',
              text: `infografia enviada`,
              html: `
              <p>proceso de inscripcion <br> 
                 para poder ver el proceso de inscripcion favor de seguir la proxima indicacion<br>
                  Acceda al siguiente enlace:
                      <a href="https://www.canva.com/design/DADgy78ExFI/YQU3lsD4qyZsnIEqsxPRtg/edit">click aqui</a>
              </p>`

            };
            mail.send(env).then(
              res=>{
                res.status(status.OK);
                res.json({msg:"infografia enviada", data: data});
              }
            ).catch(
              err=>{
                res.status(status.OK);
                res.json({msg:"infografia enviada", data: data});
              }
            );
            
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        });
};


module.exports = (User) => {
    _user = User;
    return({
       
       
        createNewUser,
       
    });
}