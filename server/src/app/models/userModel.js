const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        min:3,
        max:20,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:20,
    },
    isAvatarSet:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:""
    }
})


const UserModel = mongoose.model("User",userSchema)
module.exports = UserModel