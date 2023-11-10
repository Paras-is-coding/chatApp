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
    const {password:psw,...rest} = registerResponse.toObject();
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



login = async (req,res,next)=>{
   try {
    const{username,password} = req.body;

    const userDetails = await userSvc.getUserByFilter({username})
    if(!userDetails){
        next({code:400,message:"Incorrect username or password!"})
    }else{
        const checkPassword = bcrypt.compareSync(password,userDetails.password);
        if(!checkPassword){
            next({code:400,message:"Incorrect username or password!"})
        }else{
            const{password:psw,...rest} = userDetails.toObject();
            res.json({
                result:rest,
                message:"Logged in successfully!",
                meta:null
            })
        }
    }
   } catch (error) {
        next(error)
   }
}


setAvatar = async(req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userSvc.updateUser({_id:userId},{
            isAvatarSet:true,
            avatar:avatarImage
        })
console.log(userData)
        res.json({
           isSet:userData.isAvatarSet,
           image:userData.avatar 
        })

    } catch (error) {
        next(error)        
    }
}


}


const userCtrl = new UserController()
module.exports = userCtrl