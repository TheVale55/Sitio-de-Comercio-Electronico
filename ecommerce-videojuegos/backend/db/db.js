const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://root:Brayton12@tec.d66so.mongodb.net/ecommerce';
    await mongoose.connect(mongoUri);
    console.log('Conexión a MongoDB exitosa');
    const db = mongoose.connection;

    // Define la colección a actualizar
  const gamesCollection = db.collection('users');
    // Actualiza todos los juegos añadiendo nuevos campos
    const result = await gamesCollection.updateMany(
      {}, // Filtro vacío para seleccionar todos los documentos
      {
        $set: {
          shoppingCart: [] // Contador de vistas inicializado en 0
        },
      }
    );
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Detiene la aplicación si falla la conexión
  }
};

module.exports = connectDB;