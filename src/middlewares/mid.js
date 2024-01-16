exports.checkCsrfError = (err, req, res, next) => {
   if(err) console.log('erro'); // res.render('404');
};

exports.csrfMiddleware = (req, res, next) => {
   res.locals.csrfToken = req.csrfToken();
   next();
};
