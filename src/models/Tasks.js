const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   usuario: { type: String, required: true},
   nome: String,
   cliente: String,
   data: String,
   link: String,
   descricao: String
});

const taskModel = mongoose.model('Tasks', taskSchema);

class Task {

   constructor(body, user) {
      this.body = body,
      this.errors = [],
      this.user = user
   }

   async create() {
      this.formataBody();
      this.validaString();

      return await taskModel.create(this.body);
   }

   async edit(id) {
      this.formataBody();
      this.validaString();

      return await taskModel.findByIdAndUpdate(id, this.body, { new: true });
   }

   async findTask(id) {
      return taskModel.findById(id);
   }

   async agroupTasks() {
      return await taskModel.find({ usuario: this.getId() });
   }

   async delete(id) {
      return await taskModel.findByIdAndDelete(id);
   }

   getId() {
      return String(this.user._id);
   }

   validaString() {
      for(let i in this.body) if(typeof this.body[i] !== 'string') String(this.body[i]);
   }

   formataBody() {
      this.body = {
         usuario: this.getId(),
         nome: this.body.nome,
         cliente: this.body.client,
         data: this.body.data,
         link: this.body.link,
         descricao: this.body.descr
      };
   }
}

module.exports = Task;




