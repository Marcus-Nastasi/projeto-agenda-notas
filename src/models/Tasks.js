const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   nome: String,
   cliente: String,
   data: String,
   link: String,
   descricao: String
});

const taskModel = mongoose.model('Task Model', taskSchema);

class Task {

   constructor(body, user) {
      this.body = body,
      this.errors = [],
      this.user = user
   }

   async create() {
      this.formataBody();
      this.validaString();

      const task = await taskModel.create(this.body);

      this.user.tasks = task;

      return this.user.tasks;
   }

   async edit(id) {
      this.formataBody();
      this.validaString();

      this.task = await taskModel.findByIdAndUpdate(id, this.body, { new: true });
   }

   async findTask(id) {
      const task = taskModel.findById(id);
      return task;
   }

   async agroupTasks() {
      const tasks = await taskModel.find();
      return tasks;
   }

   async delete(user, id) {
      const task = await taskModel.findByIdAndDelete(id);
      return task;
   }

   getUser() {
      console.log(this.user);
   }

   validaString() {
      for(let i in this.body) if(typeof this.body[i] !== 'string') String(this.body[i]);
   }

   formataBody() {
      this.body = {
         nome: this.body.nome,
         cliente: this.body.client,
         data: this.body.data,
         link: this.body.link,
         descricao: this.body.descr
      };
   }

}

class User {

   constructor({ _id, email, telefone, senha, tasks }) {
      this._id = _id,
      this.email = email,
      this.telefone = telefone,
      this.senha = senha,
      this.tasks = [ ...tasks ]
   }

   setTasks(...tasks) {
      this.tasks.push(tasks);

      return this;
   }
}


module.exports = { Task, User };




