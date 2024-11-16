const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  Payment_ID: {
    type: String,
    required: true,
  },
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Games: [{
    Game_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    }
  }],
  Purchase_Address: {
    type: String,
    required: true,
    },
  Order_Status: {
    type: String,
    enum: ['en preparación', 'enviado', 'entregado'],
    default: 'en preparación',
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Crear el modelo de Pago
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;