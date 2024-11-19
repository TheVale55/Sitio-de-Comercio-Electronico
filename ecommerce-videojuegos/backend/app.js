const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db/db');

connectDB();


// Crear una instancia de Express
const app = express();

// Middlewares para los procesos logicos
app.use(cors());
app.use(express.json());

const Game = require('./models/game');
const Payment = require('./models/payment');
const User = require('./models/user');

// Importar las rutas
const gameRoutes = require('./routes/gameRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');

// Uso de las rutas
app.use('/api/games', gameRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

module.exports = app;
