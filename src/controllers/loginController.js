const CreateUser = require('../models/CreateUser');

exports.index = (req, res) => res.render('login', { sucess: false, err: false });

// user controller
exports.user = (req, res) => res.render('404');

// register controllers
exports.register = async (req, res) => {
   const registroLogin = new CreateUser(req.body);
   await registroLogin.registraUsuario();

   var err = false;
   var sucess = false;

   if(registroLogin.errors.length == 0) {
      err = false;
      sucess = true;
   } else {
      err = registroLogin.errors;
      sucess = false
   }

   // res.redirect('back'); // volta para página anterior. 

   res.render('login', { sucess: sucess, err: err });
};

