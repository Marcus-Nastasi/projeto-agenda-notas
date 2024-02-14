const Task = require('../models/Tasks');

exports.index = async (req, res) => {
   try {
      const user = req.session.user
      var tasks;

      res.locals.user = user;

      if(user) {
         const homeTask = new Task(req.body, req.session.user);
         tasks = await homeTask.agroupTasks();
      }
   
      req.session.save(() => {
         return res.render('index', { 
            user: req.session.user, 
            tasks: tasks 
         });
      });

   } catch (error) {
      console.log(error);
      return res.render('404');
   }
};

