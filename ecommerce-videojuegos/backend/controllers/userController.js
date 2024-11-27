const User = require('../models/user');
const Game = require('../models/game');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ IsActive: true });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { IsActive: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  console.log(req.body)
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Borrado lógico de un usuario (actualizar IsActive a false)
const deleteUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { IsActive: false }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario desactivado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Agregar un juego al carrito de compras
const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    user.shoppingCart.push(game._id);
    await user.save();

    res.status(200).json({ message: 'Juego agregado al carrito', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un juego del carrito de compras
const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.shoppingCart.pull(req.params.gameId);
    await user.save();

    res.status(200).json({ message: 'Juego eliminado del carrito', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Agregar un juego a la lista de deseos
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    user.wishlist.push(game._id);
    await user.save();

    res.status(200).json({ message: 'Juego agregado a la lista de deseos', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un juego de la lista de deseos
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.wishlist.pull(req.params.gameId);
    await user.save();

    res.status(200).json({ message: 'Juego eliminado de la lista de deseos', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist
};
