import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

// placing order using COD
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "cod",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // empty cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// placing order using stripe
const placeOrderStripe = async (req, res) => {};

// placing order using razorpay
const placeOrderRazorpay = async (req, res) => {};

// all orders data for admin pannel
const allOrders = async (req, res) => {
  try {
    // all orders of all users
    const orders = await orderModel.find({});
    res.json({
      success:true,
      orders
    })
  } catch (error) {
    console.log(error)
    res.json({
      success:false,
      message:error.message
    })
  }
};

// user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update order status from admin pannel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
