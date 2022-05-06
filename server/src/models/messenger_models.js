const mongoose = require("mongoose")

const messageSchema =  new mongoose.Schema({
    senderId : {
        type : String,
        required : true
    },
    reseverId : {
        type : String,
        required : true
    },
    message : {
        text : {
            type : String,
            default : ''
        },
        image : {
            type : Object,
            default : ''
        }
    },
    status : {
        type : String,
        default : 'unseen'
    }
},{collection:"Message",timestamps:true})

const Message = mongoose.model("Message",messageSchema)
module.exports = Message; 

