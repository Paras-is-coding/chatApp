const MessageModel = require('../models/messageModel.js');
class MessageService{
    addMsg = async (data) =>{
        try {
            const addRes = await MessageModel.create(data);
            return addRes
        } catch (error) {
            throw error
        }
    }


    getAllMsg = async (req)=>{
        try {
            const {from,to} = req.body;

            const messages = await MessageModel.find({users:{$all:[from,to]}}).sort({updatedAt:1});
            return messages;
        } catch (error) {
            throw error            
        }
    }

}



const messageSvc = new MessageService()
module.exports = messageSvc