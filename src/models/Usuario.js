
class Usuario {

   constructor(body) {
      this.body = body;
      this.errors = [];
      this.user = null;
      this.tasks = [];
   }

   // REGISTRO
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

   async setaTasks(tasks) {
      this.validaString();

      if(!tasks.length > 0) return;

      tasks.forEach(element => this.body.tasks.push(element));
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



   // LOGIN
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



   // TASKS
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

   formataBody() {
      this.body = {
         nome: this.body.nome,
         cliente: this.body.client,
         data: this.body.data,
         link: this.body.link,
         descricao: this.body.descr
      };
   }


   // GENERICOS

}

