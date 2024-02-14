const { CreateUser, LogUser } = require('../models/User');

var err = false;
var sucess = false;
var logErr = false;

// Index controller
exports.index = (req, res) => {
   res.render('login', { 
      sucess: sucess, 
      err: err, 
      logErr: logErr,
      user: null
   });
};

// register controllers
exports.register = async (req, res) => {
   try {
      const registroLogin = new CreateUser(req.body);
      await registroLogin.registraUsuario();

      if(registroLogin.errors.length !== 0) {
         err = registroLogin.errors;
         sucess = false;

         return res.redirect('back');   
      }

      err = false;
      sucess = true;

      return res.redirect('back');
   
   } catch(e) {
      res.render('404');
      console.error(e);
   }
};

// login controllers
exports.logUser = async (req, res) => {
   try {
      const logUser = new LogUser(req.body);
      await logUser.logaUsuario();

      if(logUser.errors.length !== 0) {
         logErr = logUser.errors;
         return res.redirect('back');
      }

      req.session.user = logUser.user;
      
      return res.redirect('/');

   } catch(e) {
      console.error(e);
      return res.render('404');
   }
};

// Rota logout
exports.logout = (req, res) => {
   req.session.destroy();
   return res.redirect('back');
};

