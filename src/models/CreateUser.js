const mongoose = require('mongoose');
const validator = require('validator');

const registerSchema = new mongoose.Schema({
   email: { type: String, required: true },
   telefone: { type: String, required: true },
   senha: { type: String, required: true },
});

const registerModel = mongoose.model('Register', registerSchema);

class CreateUser {
   constructor(body) {
      this.body = body;
      this.errors = [];
      this.user = null;
   }

   async registraUsuario() {
      this.validaCampos();
      if(this.errors.length > 0) return;
      try {
         this.user = await registerModel.create({
            email: this.body.email,
            telefone: this.body.telefone,
            senha: this.body.senha,
         });
      } catch(e) {
         console.error(e);
      }
   }

   validaCampos() {
      this.validaString();
      this.formataBody();
      this.validaErrosCampos();
   }

   // baixa ordem
   validaString() {
      for(let i in this.body) if(typeof this.body[i] !== 'string') String(this.body[i]);
   }

   formataBody() {
      this.body = {
         email: this.body.cadastroEmail,
         telefone: this.body.telefone,
         senha: this.body.cadastroSenha,
         confirmSenha: this.body.confirmSenha
      };
   }

   validaErrosCampos() {
      // email
      if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

      // telefone
      if(this.body.telefone.length == 0) this.errors.push('O telefone precisa ser preenchido.');
      if(!validator.isMobilePhone(this.body.telefone, 'pt-BR')) {
         this.errors.push('Telefone inválido  (Inserir DDD também).')
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
module.exports = CreateUser;
