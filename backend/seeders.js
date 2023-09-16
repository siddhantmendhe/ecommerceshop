import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from 'colors';
import users from "./data/users";
import products from "./data/product";
import User from "./models/productModel";
import Product from "./models/productModel";
import Order from "./models/orderModel";
import connectDB from "./config/db";

dotenv.config();

connectDB();