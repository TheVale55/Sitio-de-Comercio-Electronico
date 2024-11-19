const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://root:Brayton12@tec.d66so.mongodb.net/ecommerce';
    await mongoose.connect(mongoUri);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Detiene la aplicación si falla la conexión
  }
};

module.exports = connectDB;