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
   try {
      if(!req.params.id) return res.render('404');

      const formEdit = new Task();
      const task = await formEdit.findTask(req.params.id);
   
      if(!task) return res.render('404');
   
      return res.render('edit', { user: req.session.user, task: task });

   } catch (error) {
      console.warn('Erro:', error);
      return res.render('404');
   }
};

exports.edit = async (req, res) => {
   try {
      const editTask = new Task(req.body);
      
      await editTask.edit(req.params.id);

      req.session.save(() => {
         return res.redirect(`/task/edit/${editTask.task._id}`);
      });

   } catch(error) {
      console.warn(error);
      return res.redirect('/login');
   }   
};

exports.delete = async (req, res) => {
   try {
      const deleteTask = new Task();
      const task = await deleteTask.delete(req.params.id);

      return req.session.save(() => res.redirect(`/`));

   } catch (error) {
      console.log(error);
      return res.render('404');
   }
};

