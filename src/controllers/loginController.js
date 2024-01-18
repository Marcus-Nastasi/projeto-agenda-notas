const CreateUser = require('../models/CreateUser');

var err = false;
var sucess = false;

exports.index = (req, res) => res.render('login', { sucess: sucess, err: err });

// user controller
exports.user = (req, res) => res.render('404');

// register controllers
exports.register = async (req, res) => {
   const registroLogin = new CreateUser(req.body);
   await registroLogin.registraUsuario();

   if(registroLogin.errors.length == 0) {
      err = false;
      sucess = true;
   } else {
      err = registroLogin.errors;
      sucess = false;
   }

   // req.session.save(function() {
   //    res.redirect('back'); // volta para página anterior. 
   // });

   res.redirect('back'); // volta para página anterior. 

};

