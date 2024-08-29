import express from 'express';
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc add new order
// @route POST/api/orders
// @access Private
const addOrderItems= asyncHandler(async (req, res) => {
  
    res.send('add order items');});

// @desc get my order
// @route GET/api/orders/mine
// @access Private
const getMyOrders= asyncHandler(async (req, res) => {
  
    res.send('get my order items');});

// @desc get my order by id
// @route GET/api/orders/:id
// @access Private
const getOrderByID= asyncHandler(async (req, res) => {
  
    res.send('get my order items by id');});

// @desc update order to paid
// @route GET/api/orders/:id/pay
// @access Private
const UpdateOderToPaid= asyncHandler(async (req, res) => {
  
    res.send('order items paid');});

// @desc update order to delivered
// @route PUT/api/orders/:id/deliver
// @access Private/Admin
const UpdateOderToDelivered= asyncHandler(async (req, res) => {
  
    res.send('order items delivered');});

// @desc get all orders
// @route GET/api/orders/all
// @access Private/Admin
const getAllOrders= asyncHandler(async (req, res) => {
  
    res.send('get all order items');});

export{
    addOrderItems,
    getMyOrders,
    getOrderByID,
    UpdateOderToPaid,
    UpdateOderToDelivered,
    getAllOrders
}