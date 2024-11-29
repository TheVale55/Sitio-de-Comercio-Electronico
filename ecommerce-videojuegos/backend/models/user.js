const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

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
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    quantity: {type: Number, default: 1},
  }],
  wishlist: [{
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

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Crear el modelo de Usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
