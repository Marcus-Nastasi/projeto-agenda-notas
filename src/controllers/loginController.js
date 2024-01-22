const CreateUser = require('../models/CreateUser');

var err = false;
var sucess = false;

exports.index = (req, res) => res.render('login', { sucess: sucess, err: err });

// register controllers
exports.register = async (req, res) => {
   try {
      const registroLogin = new CreateUser(req.body);
      await registroLogin.registraUsuario();
      if(registroLogin.errors.length == 0) {
         err = false;
         sucess = true;
      } else {
         err = registroLogin.errors;
         sucess = false;
      }
      res.redirect('back'); // volta para página anterior.
   } catch(e) {
      res.render('404');
      console.error(e);
   }
};

// register controllers
exports.logUser = async (req, res) => {
   try {
      const registroLogin = new CreateUser(req.body);
      await registroLogin.registraUsuario();
      if(registroLogin.errors.length == 0) {
         err = false;
         sucess = true;
      } else {
         err = registroLogin.errors;
         sucess = false;
      }
      res.redirect('back'); // volta para página anterior.
   } catch(e) {
      res.render('404');
      console.error(e);
   }
};

