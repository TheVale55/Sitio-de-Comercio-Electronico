const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  Payment_ID: {
    type: String,
  },
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Games: [{
    _id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Game',
    },
    Quantity: {
      type: Number,
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
  Total_Amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Crear el modelo de Pago
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
