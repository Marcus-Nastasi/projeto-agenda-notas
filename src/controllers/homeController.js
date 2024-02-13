const { Task, User } = require('../models/Tasks');

exports.index = async (req, res) => {
   try {
      res.locals.user = req.session.user;
      res.locals.user.tasks = [];

      const homeTask = new Task(req.body, req.session.user);
   
      // homeTask.getUser();
      
      const tasks = await homeTask.agroupTasks();

      res.locals.user.tasks = [...tasks];
   
      req.session.save(() => {
         return res.render('index', { 
            user: res.locals.user, 
            tasks: tasks 
         });
      });

   } catch (error) {
      console.log(error);
      return res.render('404');
   }

};

