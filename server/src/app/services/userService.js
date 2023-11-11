const UserModel = require('../models/userModel.js')
class UserService{
    registerUser = async (payload) =>{
        try {
            const user = new UserModel(payload)            
            const response = await user.save()
            return response
        } catch (error) {
            throw error
            
        }
    }
    getUserByFilter = async (filter)=>{
        try {
            const userDetails = await UserModel.findOne(filter)
            return userDetails

        } catch (error) {
            throw error
            
        }
    }


    updateUser = async (filter,data)=>{
        try {
            let response = await UserModel.findOneAndUpdate(filter,{
                $set:data
            })
            return response;
        } catch (except) {
            throw except;            
        }
    }


    getAllUsers = async (req)=>{
        try {
            const users = await UserModel.find({_id:{$ne:req.params.id}}).select([
                "email",
                "username",
                "avatar",
                "_id"
            ]);
            return users;
        } catch (error) {
            throw error            
        }
    }

}



const userSvc = new UserService()
module.exports = userSvc