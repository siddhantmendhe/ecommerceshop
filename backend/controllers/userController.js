import express from 'express';
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc Auth user and ger token
// @route POST/api/users/login
// @access Public

const authUser=asyncHandler(async(req,res)=>{
    const {email, password}=req.body;
    const user =await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            admin:user.isAdmin

        })
        
    }
    else{
        res.status(401);
        throw new Error('Password or email is worng');
        
    }
})

// @desc Logout user
// @route POST/api/users/login
// @access Public

const logoutUser=asyncHandler(async(req,res)=>{
    res.send('logout user');
})

// @desc register user
// @route POST/api/users/
// @access Public
const registerUser=asyncHandler(async(req,res)=>{
    res.send('register user');
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
    res.send('update user profile');
});

// @desc get all users
// @route GET/api/users
// @access Private/Admin

const getUsers =asyncHandler(async(req, res)=>{
    res.send('get all user');
});

// @desc delete users
// @route DELETE/api/users/:id
// @access Private/Admin

const deleteUser=asyncHandler(async(req, res)=>{
    res.send('Delete User by ID');
});

// @desc get users by ID
// @route GET/api/users/:id
// @access Private/Admin

const getUserById=asyncHandler(async(req, res)=>{
    res.send('get users by ID');
});

// @desc update user
// @route PUT/api/users/:id
// @access Private/Admin
const updateUser=asyncHandler(async(req, res)=>{
    res.send('Update Users by ID');
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