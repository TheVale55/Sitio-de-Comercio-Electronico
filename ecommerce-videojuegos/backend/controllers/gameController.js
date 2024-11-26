const Game = require('../models/game');

// Obtener todos los juegos con filtros avanzados y búsqueda parcial
const getAllGames = async (req, res) => {
  try {
    const { platform, category, esrbRating, precioMin, precioMax, brand} = req.query;
    // Crear un objeto de filtro dinámico
    const filters = {};
    // Búsqueda parcial por plataforma
    if (platform) {
      filters.Game_Platform = { $regex: platform, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }
    // Filtro por categoría
    if (category) {
      filters.Game_Category = { $in: [category] }; // Busca la categoría dentro del array
    }
    // Filtro por ESRB Rating
    if (esrbRating) {
      filters.Game_ESRB_Rating = { $regex: esrbRating, $options: 'i'}; // Filtra por coincidencia exacta
    }
    if (precioMin) {
      filters.Game_Price = { $gte: parseFloat(precioMin)};
    }
    if (precioMax) {
      filters.Game_Price = { $lte: parseFloat(precioMax)};
    }
    if (brand) {
      filters.Game_Brand = { $regex: brand, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }
    // Consultar la base de datos aplicando los filtros
    const games = await Game.find(filters);
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSaleGames = async (req, res) => {
  try {
    const games = await Game.find({ Discount: { $gt: 0 } });
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Obtener un juego por ID
const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo juego
const createGame = async (req, res) => {
  const game = new Game(req.body);
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un juego
const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un juego
const deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json({ message: 'Juego eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getSaleGames
};
