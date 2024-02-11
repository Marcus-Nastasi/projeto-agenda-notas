const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   nome: String,
   local: String,
   email: String,
   tel: String
});

const taskModel = mongoose.model('Task Model', taskSchema);

class CreateTask {
   constructor(body) {
      this.body = body,
      this.errors = [],
      this.task = null
   }


}

class EditTask {

}

class DelTask {

}

module.exports = { CreateTask, EditTask, DelTask };


