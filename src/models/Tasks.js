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

   constructor(body) {
      this.body = body,
      this.errors = [],
      this.task = null
   }

   async create() {
      this.formataBody();
      this.validaString();

      this.task = await taskModel.create(this.body);
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

   async delete(id) {
      const task = await taskModel.findByIdAndDelete(id);
      return task;
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


module.exports = Task;


