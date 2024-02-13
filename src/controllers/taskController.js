const Task = require('../models/Tasks');

exports.createTask = async (req, res) => {
   try {
      const newTask = new Task(req.body);
      await newTask.create();

      // const id = await newTask.findTask(newTask.task._id);
   
      // console.log(newTask.task._id);

      req.session.save(() => {
         return res.redirect(`/task/edit/${newTask.task._id}`);
      });

   } catch(e) {
      console.warn('Erro', e);
      return res.render('404');
   }
};

exports.formEdit = async (req, res) => {
   if(!req.params.id) return res.render('404');

   const editTask = new Task();
   const task = await editTask.findTask(req.params.id);

   res.render('edit', { user: req.session.user, task: task });
};

exports.edit = async (req, res) => {
   console.log(req.body);
   return res.send('postado');
};


