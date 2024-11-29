const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rutas CRUD para Pagos
router.get('/active-users-by-day', paymentController.getActiveUsersByDay);
router.get('/orders-by-day', paymentController.getOrdersByDay);
router.get('/top-selling-products', paymentController.getTopSellingProducts);
router.get('/', paymentController.getAllPayments);       // Obtener todos los pagos
router.get('/:id', paymentController.getPaymentById);    // Obtener un pago por ID
router.post('/', paymentController.createPayment);       // Crear un nuevo pago
router.put('/:id', paymentController.updatePayment);     // Actualizar un pago por ID
router.delete('/:id', paymentController.deletePayment);  // Eliminar un pago por ID



module.exports = router;
