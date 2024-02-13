const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   nome: String,
   cliente: String,
   data: String,
   link: String,
   descricao: String
});

const taskModel = mongoose.model('Task Model', taskSchema);

class CreateTask {
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

class EditTask {

}

class DelTask {

}

module.exports = { CreateTask, EditTask, DelTask };


