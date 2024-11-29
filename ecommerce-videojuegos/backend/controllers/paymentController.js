const Payment = require('../models/payment');
const User = require('../models/user');
// Obtener todos los pagos
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
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
    const topSellingProducts = await Payment.aggregate([
      {
        $unwind: '$Games',
      },
      {
        $group: {
          _id: '$Games',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);	
    res.status(200).json(topSellingProducts);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getTopSellingProducts,
  //getActiveUsersByDay,
  //getOrdersByDay,
};
