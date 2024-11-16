const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  Game_ID: {
    type: Number,
    required: true,
  },
  Game_Name: {
    type: String,
    required: true,
  },
  Game_Description: {
    type: String,
    required: true,
  },
  Game_Price: {
    type: Number,
    required: true,
  },
  Game_Category: [{
    type: String,
  }],
  Game_Platform: [{
    type: String,
  }],
  Game_ESRB_Rating: {
    type: String,
  },
  Game_Short_Screenshots: [{
    type: String,
  }],
  Game_Background_Image: {
    type: String,
  },
  Brand: {
    type: String,
  },
  Technical_Specifications: {
    Requirements_en: {
      Minimum: {
        type: String,
      },
      Recommended: {
        type: String,
      },
    },
  },
  Discount: {
    type: Number,
  }
}, { timestamps: true });

// Crear el modelo de Juego
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
