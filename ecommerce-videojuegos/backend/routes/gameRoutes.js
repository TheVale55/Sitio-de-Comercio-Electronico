const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rutas CRUD para Juegos
router.get('/', gameController.getAllGames);       // Obtener todos los juegos
router.get('/sale', gameController.getSaleGames)
router.get('/:id', gameController.getGameById);    // Obtener un juego por ID
router.post('/', gameController.createGame);       // Crear un nuevo juego
router.put('/:id', gameController.updateGame);     // Actualizar un juego por ID
router.delete('/:id', gameController.deleteGame);  // Eliminar un juego por ID

module.exports = router;
