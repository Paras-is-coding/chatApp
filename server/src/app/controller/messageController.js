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
        try {
            const {from,to} = req.body;
            const messages =  await messageSvc.getAllMsg(req);
            // we return boolean(fromSelf) with each message
            const projectMessages = messages.map((msg)=>{
                return({
                    fromSelf:msg.sender.toString() === from,
                    message:msg.message.text
                })
            });

            res.json(projectMessages)

        } catch (error) {
            next(error)            
        }
    }
}


const messageCtrl = new MessageController()
module.exports = messageCtrl