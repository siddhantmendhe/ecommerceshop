import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false,
    }

},{
    timestamps: true
});

userSchema.methods.matchPassword= async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    else{
        this.password= bcrypt.hashSync(this.password, 10);
    }
})

const User= mongoose.model('User', userSchema);
export default User;