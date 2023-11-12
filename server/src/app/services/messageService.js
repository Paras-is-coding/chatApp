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


    getAllMsg = async ()=>{
    }

}



const messageSvc = new MessageService()
module.exports = messageSvc