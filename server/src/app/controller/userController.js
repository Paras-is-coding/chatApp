const bcrypt = require('bcrypt');
const userSvc = require('../services/userService.js');


class UserController{
register = async (req,res,next)=>{
   try {
    const{username,email,password} = req.body;

    const usernameCheck = await userSvc.getUserByFilter({username})
    if(usernameCheck){
        next({code:400,message:"Username already used!"})
    }
    const emailCheck = await userSvc.getUserByFilter({email})
    if(emailCheck){
        next({code:400,message:"Email already used!"});
    }
    if(!usernameCheck && !emailCheck){
    const hashedPassword = bcrypt.hashSync(password,10)
    const user = {
        username,
        email,
        password:hashedPassword
    };
    const registerResponse = await userSvc.registerUser(user);
    const {password:psw,...rest} = registerResponse._doc;
    res.json({
        result:rest,
        message:"User registered successfully!",
        meta:null
    })
}
   } catch (error) {
        next(error)
   }
}



}


const userCtrl = new UserController()
module.exports = userCtrl