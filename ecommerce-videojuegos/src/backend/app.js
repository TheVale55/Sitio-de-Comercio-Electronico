const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Crear una instancia de Express
const app = express();

// Middlewares para los procesos logicos
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conectado a MongoDB');
});

// Importar los modelos
const Game = require('./models/game');
const Payment = require('./models/payment');
const User = require('./models/user');


app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

module.exports = app;
