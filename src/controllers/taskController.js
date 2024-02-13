const { CreateTask, EditTask, DelTask } = require('../models/Tasks');

exports.createTask = (req, res) => {
   try {
      const newTask = new CreateTask(req.body);
      newTask.create();
   
      return res.redirect('back');

   } catch(e) {
      console.warn('Erro', e);
      return res.render('404');
   }
};

