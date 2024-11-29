const Payment = require('../models/payment');
const User = require('../models/user');
// Obtener todos los pagos
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $addFields: {
          statusOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$Order_Status", "en preparación"] }, then: 1 },
                { case: { $eq: ["$Order_Status", "enviado"] }, then: 2 },
                { case: { $eq: ["$Order_Status", "entregado"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      { $sort: { statusOrder: 1 } }, // Ordenar por el campo agregado
      { $project: { statusOrder: 0 } }, // Eliminar el campo auxiliar
    ]);
    
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un pago por ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo pago
const createPayment = async (req, res) => {
  const payment = new Payment(req.body);
  try {
    const newPayment = await payment.save();
    const user = await User.findById(newPayment.User_ID);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.purchaseHistory.push(newPayment._id);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un pago
const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un pago
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.status(200).json({ message: 'Pago eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Payment.aggregate([
      { $unwind: "$Games" }, // Desglosar cada juego de la lista
      {
        $group: {
          _id: "$Games",
          totalSold: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "games", // Colección de juegos
          localField: "_id",
          foreignField: "_id",
          as: "gameDetails",
        },
      },
      { $unwind: "$gameDetails" },
      {
        $project: {
          _id: 0,
          gameId: "$_id",
          name: "$gameDetails.Game_Name",
          totalSold: 1,
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }, // Limitar a los 10 más vendidos
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos más vendidos", error });
  }
};



const getActiveUsersByDay = async (req, res) => {
  try {
    const activeUsers = await User.aggregate([
      {
        $match: { IsActive: true }, // Solo usuarios activos
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          totalUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Ordenar por fecha
    ]);

    res.status(200).json(activeUsers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios activos por día", error });
  }
};



const getOrdersByDay = async (req, res) => {
  try {
    const ordersByDay = await Payment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$Total_Amount" },
        },
      },
      { $sort: { _id: 1 } }, // Ordenar por fecha
    ]);

    res.status(200).json(ordersByDay);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos por día", error });
  }
};



module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getTopSellingProducts,
  getActiveUsersByDay,
  getOrdersByDay,
};
