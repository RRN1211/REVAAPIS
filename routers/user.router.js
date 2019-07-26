const router = require('express').Router();

module.exports = (wagner) => {
    
    const userCtrl = wagner.invoke((User) => 
        require('../controllers/user.controller')(User));

 
    
    router.post('/registro',(req,res) =>
        userCtrl.createNewUser(req,res));
    return router;
}