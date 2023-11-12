const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message:{
    text:{
        type:String,
        required:true,
         }
     },
  users:Array,
  sender:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    }
},
{
    timestamps:true
}
)


const MessageModel = mongoose.model("Message",messageSchema)
module.exports = MessageModel