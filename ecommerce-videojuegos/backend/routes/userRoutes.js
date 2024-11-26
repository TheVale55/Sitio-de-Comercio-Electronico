const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas CRUD para Usuarios
router.get('/', userController.getAllUsers);       // Obtener todos los usuarios
router.get('/:id', userController.getUserById);    // Obtener un usuario por ID
router.post('/', userController.createUser);       // Crear un nuevo usuario
router.put('/:id', userController.updateUser);     // Actualizar un usuario por ID
router.delete('/:id', userController.deleteUser);  // Desactivar un usuario por ID

// Rutas para el carrito de compras
router.put('/:userId/cart/:gameId', userController.addToCart);         // Agregar un juego al carrito
router.delete('/:userId/cart/:gameId', userController.removeFromCart);  // Eliminar un juego del carrito

// Rutas para la wishlist
router.put('/:userId/wishlist/:gameId', userController.addToWishlist);         // Agregar un juego a la lista de deseos
router.delete('/:userId/wishlist/:gameId', userController.removeFromWishlist);  // Eliminar un juego de la lista de deseos

module.exports = router;
