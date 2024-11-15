
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conectado a MongoDB en Azure');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

