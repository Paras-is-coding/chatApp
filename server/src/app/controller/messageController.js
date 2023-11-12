const messageSvc = require("../services/messageService");

class MessageController{
    addMessage = async (req,res,next)=>{
        try {
            const {from,to,message} = req.body;
            const data = {
                message:{text:message},
                users:[from,to],
                sender:from
            }
            const addRes = await messageSvc.addMsg(data);
            if(addRes){
                res.json({
                    result:addRes,
                    message:"Message added successfully!",
                    meta:null
                })
            }else{
                next({code:400,message:"Failed to add message to Database!"})
            }
        } catch (error) {
            next(error)            
        }
    }
    getAllMessage = async (req,res,next)=>{

    }
}


const messageCtrl = new MessageController()
module.exports = messageCtrl