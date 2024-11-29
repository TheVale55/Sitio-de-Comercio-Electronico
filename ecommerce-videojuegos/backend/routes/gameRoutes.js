const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rutas CRUD para Juegos
router.get('/', gameController.getAllGames);       // Obtener todos los juegos
router.post('/', gameController.createGame);       // Crear un nuevo juego
router.get('/sale', gameController.getSaleGames)
router.put('/sale', gameController.setDiscount); // Agregar un descuento a un juego
router.get('/:id', gameController.getGameById);    // Obtener un juego por ID
router.put('/:id', gameController.updateGame);     // Actualizar un juego por ID
router.delete('/:id', gameController.deleteGame);  // Eliminar un juego por ID
router.put('/:id/views', gameController.addViewCounter); // Agregar una vista a un juego
router.put('/:id/stock', gameController.updateStock);  // Actualizar el stock de un juego
module.exports = router;
