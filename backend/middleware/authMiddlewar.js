import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
//To verify userid in the db
const protect=asyncHandler(async(req, res, next)=>{
    if(req.cookies.jwt){

        try{
            const decoded=jwt.verify( req.cookies.jwt, process.env.JWTCode);
            req.user=await User.findById(decoded.userId).select('-password');
          
            
            next();
        }
    catch{
        throw new Error('You are not authorized, Token failed');
    }}
    
    else{
        throw new Error('You are not autherized');
    }

})

//to findout is user admin
const admin=asyncHandler((req,res, next)=>{
    if(req.user&& req.user.isAdmin){
        next();
    }
    else{
        throw new Error('You are not Admin')
    }
})
export {protect, admin}