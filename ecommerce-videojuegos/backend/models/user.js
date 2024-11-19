const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  User_ID: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['usuario', 'administrador','Operador de logística'],
    default: 'usuario'
    },
  shoppingCart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  }],
  purchaseHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }],
  IsActive:
   { type: Boolean,
     default: true,
   }
    }, { timestamps: true });

// Crear el modelo de Usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
