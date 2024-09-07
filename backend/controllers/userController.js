import express from 'express';
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { genJsonToken } from '../utils/genJsonToken.js';

// @desc Auth user and ger token
// @route POST/api/users/login
// @access Public
dotenv.config()

const authUser=asyncHandler(async(req,res)=>{
    const {email, password}=req.body;
    const user =await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        genJsonToken(res,user._id);
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin

        })
        
    }
    else{
      //overring jwt in cookie for security
        res.cookie('jwt','',
            {
                httpOnly: true,
               
               expires: new Date(0)
            }
        )
        res.status(401);
        throw new Error('Password or email is worng');
        
    }
})

// @desc Logout user
// @route POST/api/users/login
// @access Public

const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',
        {
            httpOnly: true,
           
           expires: new Date(0)
        }
    )
    res.status(200).json({message:'You are logged out'});
})

// @desc register user
// @route POST/api/users/
// @access Public
const registerUser=asyncHandler(async(req,res)=>{
    const {name, email, password} =req.body;
    // check if this email user already exists
    if(await User.findOne({email})){
        res.status(401);
        throw new Error('Already Registered!');
    }
    else{
        const user= await User.create({name, email, password});
        genJsonToken(res, user._id);
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin

        })

    }
   
});

// @desc Get user profile
// @route GET/api/users/profile
// @access Private

const getUserProfile=asyncHandler(async(req, res)=>{
    res.send('get user profile');
});

// @desc update user profile
// @route PUT/api/users/profile
// @access Private/Admin
const updateUserProfile=asyncHandler(async(req, res)=>{
    const user =await User.findById(req.user._id);
    console.log(user);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        const updatedUser=await user.save();

        res.status(200).json({
            id:updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin:updatedUser.isAdmin

        })
    }
    else{
        res.status(401)
        throw new Error('user not found')
    }
  
});

// @desc get all users
// @route GET/api/users
// @access Private/Admin

const getUsers =asyncHandler(async(req, res)=>{
    const users= await User.find({});
    if(users){
        res.status(200).json(users);
    }
    else{
        res.status(404)
        throw new Error('User not found');
    }
});

// @desc delete users
// @route DELETE/api/users/:id
// @access Private/Admin

const deleteUser=asyncHandler(async(req, res)=>{
    const user= await User.findById(req.params.id)
    if(user){
        if(user.isAdmin){
        res.status(404);
        throw new Error('Can not delete admin user')
            
        }
        await user.deleteOne({_id:user._id});
        res.status(200).json('user deleted')
    }
    else{
        res.status(404)
        throw new Error('User not found');

    }
});

// @desc get users by ID
// @route GET/api/users/:id
// @access Private/Admin

const getUserById=asyncHandler(async(req, res)=>{
    const user= await User.findById(req.params.id).select('-password');;
    if(user){
        res.json(user);
    }else{
        res.status(404)
        throw new Error('User not found');

    }
});

// @desc update user
// @route PUT/api/users/:id
// @access Private/Admin
const updateUser=asyncHandler(async(req, res)=>{
    const user= await User.findById(req.params.id);
    const data=req.body
    if(user){
        user.name=data.name || user.name;
        user.email=data.email || user.email;
        user.isAdmin = Boolean(user.isAdmin)||Boolean(data.isAdmin);
        if(req.body.password){
            user.password=data.password;
        }
        const updatedUser=await user.save();

        res.status(200).json({
            id:updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin:updatedUser.isAdmin

        })

    }
    else{
        res.status(404);
        throw new Error('User not found');

    }
});

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
  };