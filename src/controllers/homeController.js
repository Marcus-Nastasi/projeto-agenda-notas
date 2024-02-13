const Task = require('../models/Tasks');

exports.index = async (req, res) => {
   res.locals.user = req.session.user;

   const homeTask = new Task(req.body);
   
   const tasks = await homeTask.agroupTasks();

   res.render('index', { user: res.locals.user, tasks: tasks });
};

