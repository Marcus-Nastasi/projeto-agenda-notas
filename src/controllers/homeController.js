exports.index = (req, res) => {
   res.locals.user = req.session.user;
   res.render('index', { user: res.locals.user });
};

