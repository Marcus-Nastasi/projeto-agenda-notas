exports.checkCsrfError = (err, req, res, next) => {
   if(err) {
      console.log('erro CSRF', err); 
      return res.render('404');
   };
};

exports.csrfMiddleware = (req, res, next) => {
   res.locals.csrfToken = req.csrfToken();
   next();
};
