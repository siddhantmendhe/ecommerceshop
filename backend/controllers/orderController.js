import express from 'express';
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc add new order
// @route POST/api/orders
// @access Private
const addOrderItems= asyncHandler(async (req, res) => {
  const {orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    
  }=req.body;

  if(orderItems && orderItems.lenght===0){
    res.status(400);
    throw new Error("There is no item in orders");
  }
  else{
    const order= new Order( {
        orderItems: orderItems.map(temp=> ({
            ...temp,
            product:temp._id,
        _id:undefined
    })),
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    });
    const createdOrder=await order.save();
    res.status(201).json(createdOrder);
  }})
  

// @desc get my order
// @route GET/api/orders/mine
// @access Private
const getMyOrders= asyncHandler(async (req, res) => {
    const orders=await Order.find({user:req.user._id});
  
    res.status(200).json(orders);
});

// @desc get my order by id
// @route GET/api/orders/:id
// @access Private
const getOrderByID= asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate('user', 'name email');
   
    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
  
    });

// @desc update order to paid
// @route GET/api/orders/:id/pay
// @access Private
const UpdateOderToPaid= asyncHandler(async (req, res) => {
  
    const order= await Order.findById(req.params.id);
    const details=req.body;
    if(order){
        order.isPaid=true;
        order.paidAt= Date.now();
        order.paymentResult={
            id:details.id,
            status:details.status,
            update_times:details.update_times,
            email_address: details.payer.email_address,
        }

        const updatedOrder= await order.save();
        res.status(200).json(updatedOrder);

    }else{
        res.status(404);
        throw new Error('Order not found');
    
    }
}
);

// @desc update order to delivered
// @route PUT/api/orders/:id/deliver
// @access Private/Admin
const UpdateOderToDelivered= asyncHandler(async (req, res) => {
  
    res.send('order items delivered');});

// @desc get all orders
// @route GET/api/orders/all
// @access Private/Admin
const getAllOrders= asyncHandler(async (req, res) => {
    const orders= await Order.find({}).populate('user', '_id name');

  
    res.status(200).json(orders);
}
);

export{
    addOrderItems,
    getMyOrders,
    getOrderByID,
    UpdateOderToPaid,
    UpdateOderToDelivered,
    getAllOrders
}