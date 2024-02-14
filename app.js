require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const mongoose = require('mongoose');
const { checkCsrfError, csrfMiddleware } = require('./src/middlewares/mid');

// conectando ao mongoDB
mongoose.connect(process.env.CONNECTIONSTRING)
   .then(() => {
      console.log('mongoDB connected');
      app.emit('ok');
   }).catch(e => console.warn(e));

// chamando dependencias
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');

// configurando as sessoes.
const sessionOptions = session({
   secret: process.env.SECRET,
   store: mongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
   resave: false,
   saveUninitialized: false,
   cookie: { 
      maxAge: 1000*60*60*3, 
      httpOnly: true 
   }
});

// usando as sessionOptions e flashes.
app.use(sessionOptions);
app.use(flash());

// encoding url para tratamento da requisição
app.use(express.urlencoded({ extended: true }));

// setando arquivos estáticos de html, ejs e css
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Importando CSRF
const csrf = require('csurf');
app.use(csrf());

// usando o middleware global para check error
app.use(checkCsrfError);

// usando middleware global para setagem de csrf
app.use(csrfMiddleware);

// config MIME Type for bundle.js
app.get('/login/assets/js/bundle.js', (req, res) => {
   res.type('application/javascript');
   res.sendFile(path.join(__dirname, 'public/assets/js/bundle.js'));
});

// usando rotas e selecionando portas de escuta
app.use(routes);

// configurando portas de requisição
app.on('ok', () => {
   console.log('http://127.0.0.1:3000/')
   app.listen(3000);
});


