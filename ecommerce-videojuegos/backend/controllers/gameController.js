const Game = require('../models/game');

// Obtener todos los juegos con filtros avanzados y búsqueda parcial
const getAllGames = async (req, res) => {
  try {
    var games;
    const { platform, category, esrbRating, precioMin, precioMax, brand, views} = req.query;
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
      filters.Brand = { $regex: brand, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }
    // Consultar la base de datos aplicando los filtros
    views === false ? games = await Game.find(filters) : games = await Game.find(filters).sort({ views: -1 });
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

const addViewCounter = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById({ _id: id });
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    game.views += 1;
    await game.save();
    res.status(200).json({ message: 'Contador de vistas actualizado', game });
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

const setDiscount = async (req, res) => {
  try{
    await Game.updateMany({}, { $set: { Discount: 0 } });
    const values = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    const randomGames = await Game.aggregate([{ $sample: { size: 16 } }]);
    for (const game of randomGames) {
      const randomIndex = Math.floor(Math.random() * values.length);
      const randomValue = values[randomIndex];
      await Game.findByIdAndUpdate(game._id, { Discount: randomValue });
    }
    res.status(200).json({ message: 'Descuentos actualizados' });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

const updateStock = async (req, res) => {
  try{
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -req.query.quantity } },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    res.status(200).json({ message: 'Cantidad actualizada correctamente', game });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cantidad', error: error.message });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getSaleGames,
  addViewCounter,
  setDiscount,
  updateStock
};
