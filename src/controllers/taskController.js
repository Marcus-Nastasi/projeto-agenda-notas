const { Task, User } = require('../models/Tasks');

exports.createTask = async (req, res) => {
   try {
      const newTask = new Task(req.body, req.session.user);
      const createdTask = await newTask.create();

      // console.log(req.session.user);

      const user = new User( req.body );

      user.setTasks();

      console.log(req.session.user);

      req.session.save(() => res.redirect(`/`));

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

      req.session.save(() => res.redirect(`/`));

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

