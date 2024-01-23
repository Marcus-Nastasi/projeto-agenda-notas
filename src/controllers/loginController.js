const { CreateUser, LogUser } = require('../models/User');

var err = false;
var sucess = false;
var logErr = false;
var logSucess = false;

// Index controller
exports.index = (req, res) => res.render('login', { 
   sucess: sucess, 
   err: err, 
   logSucess: logSucess,  
   logErr: logErr
});

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

// login controllers
exports.logUser = async (req, res) => {
   try {
      const logUser = new LogUser(req.body);
      await logUser.logaUsuario();
      if(logUser.errors.length == 0) {
         logErr = false;
         logSucess = 'Você logou com sucesso';
      } else {
         logErr = logUser.errors;
         logSucess = false;
      }
      req.session.user = logUser.user;
      res.redirect('back'); // volta para página anterior.
   } catch(e) {
      res.render('404');
      console.error(e);
   }
};

