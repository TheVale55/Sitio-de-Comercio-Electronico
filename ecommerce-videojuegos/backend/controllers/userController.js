const User = require('../models/user');
const Game = require('../models/game');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
  const { userID } = req.query;
  try {
    const user = await User.findById({_id: userID, isActive: true}).select('-password');
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
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
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

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    'ecommerce-videojuegos-TEC',
    { expiresIn: '1h' }
  );
  return token
};

const getToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  try {
    const decoded = jwt.verify(token, 'ecommerce-videojuegos-TEC');
    res.status(200).json({ token: token, user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

const register = async(req, res) => {
  const { email, password, username } = req.query;
  try {
    const role = 'usuario';
    const shoppingCart = [];
    const purchaseHistory = [];
    const isActive = true;
    const user = await User.create({ email, password, username, role, shoppingCart, purchaseHistory, isActive });
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  }catch(error) {
    res.status(400).json({ message: 'Error al crear el usuario', error });
  }
}

const login = async(req, res) => {
  const { credential, password } = req.query;
  try{
    const user = await User.findOne({ $or: [{ email: credential }, { username: credential }] });
    if(!user){
      return res.status(404).json({ message: 'Usuario no registrado' });
    }
    if(user.IsActive === false){
      return res.status(401).json({ message: 'Usuario desactivado' });
    }
    if(!await user.matchPassword(password)){
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = generateToken(user);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, user });
  }catch(error){
    res.status(400).json({ message: 'Error al iniciar sesión', error });
  }
}

const changeRole = async(req, res) => {
  const { newRole } = req.query;
  try{
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.role = newRole;
    await user.save();
    res.status(200).json({ message: 'Rol de usuario actualizado', user });
  }catch(error){
    res.status(400).json({ message: 'Error al actualizar el rol del usuario', error });
  }

}

const getShoppingCart = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ shoppingCart: user.shoppingCart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getPurchaseHistory = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ purchaseHistory: user.purchaseHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWishlist = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ wishlist: user.wishlist });
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
  removeFromWishlist,
  register,
  login,
  changeRole,
  getToken,
  getShoppingCart,
  getPurchaseHistory,
  getWishlist
};
