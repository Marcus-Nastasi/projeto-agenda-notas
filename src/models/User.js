const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const registerSchema = new mongoose.Schema({
   email: { type: String, required: true },
   telefone: { type: String, required: true },
   senha: { type: String, required: true },
   tasks: Array
});

registerModel = mongoose.model('Register', registerSchema);

class CreateUser {

   constructor(body) {
      this.body = body;
      this.errors = [];
      this.user = null;
   }

   async registraUsuario() {
      await this.validaCampos();

      if(this.errors.length > 0) return;

      const salt = bcrypt.genSaltSync();
      this.body.senha = bcrypt.hashSync(this.body.senha, salt);

      this.user = await registerModel.create({
         email: this.body.email,
         telefone: this.body.telefone,
         senha: this.body.senha,
      });
   }

   async validaCampos() {
      this.validaString();
      this.formataBody();
      this.validaErrosCampos();
      await this.userExists();
   }

   // baixa ordem
   async userExists() {
      const userCadastrado = await registerModel.findOne({ email: this.body.email });
      if(userCadastrado) this.errors.push('E-mail já cadastrado.');
   }

   validaString() {
      for(let i in this.body) if(typeof this.body[i] !== 'string') String(this.body[i]);
   }

   formataBody() {
      this.body = {
         email: this.body.cadastroEmail,
         telefone: this.body.telefone,
         senha: this.body.cadastroSenha,
         confirmSenha: this.body.confirmSenha,
         tasks: []
      };
   }

   validaErrosCampos() {
      // email
      if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

      // telefone
      if(this.body.telefone.length == 0) this.errors.push('O telefone precisa ser preenchido.');
      if(!validator.isMobilePhone(this.body.telefone, 'pt-BR')) {
         this.errors.push('Telefone inválido (Inserir DDD também).')
      }

      // senha
      if(this.body.senha.length < 5 || this.body.senha.length > 50) {
         this.errors.push('A senha precisa ter entre 5 e 50 caracteres.');
      }
      
      if(!this.body.senha.match(/[a-z]/g)) this.errors.push('Senha fraca. Faltam minúsculas.');
      
      if(!this.body.senha.match(/[A-Z]/g)) this.errors.push('Senha fraca. Faltam maiúsculas.');
      
      if(!this.body.senha.match(/[1-9]/g)) this.errors.push('Senha fraca. Faltam números.');
      
      if(!this.body.senha.match(/[!"#$%&'()*+\,\./:;<=>?@[\]^_`{|}~-]/g)) {
         this.errors.push('Senha fraca. Faltam caracteres especiais.');
      }
      
      // confirmador de senha
      if(this.body.confirmSenha !== this.body.senha) {
         this.errors.push('Confirmação de senha diferente da senha.');
      }
   }
}

// Login Usuário
class LogUser {
   constructor(body) {
      this.body = body;
      this.errors = [];
      this.user = null;
   }

   async logaUsuario() {
      await this.validaCampos();
      if(this.errors.length > 0) return;
   }

   async validaCampos() {
      this.validaString();
      await this.userExists();
   }

   // baixa ordem
   async userExists() {
      this.user = await registerModel.findOne({ email: this.body.loginEmail });
      if(!this.user) {
         this.errors.push('E-mail não encontrado. Faça o cadastro.');
         return;
      }

      if(!bcrypt.compareSync(this.body.loginSenha, this.user.senha)) {
         this.errors.push('Senha inválida.');
         return;
      }
   }

   validaString() {
      for(let i in this.body) if(typeof this.body[i] !== 'string') String(this.body[i]);
   }
}


// getters e setters de task



module.exports = { CreateUser, LogUser };

