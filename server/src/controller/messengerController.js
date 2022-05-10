const Message = require('../models/messenger_models');
const fs = require("fs")

const messageSend = async(req,res,next)=>{

        const {
            reseverId,
            messageContent
        } = req.body;
        const senderId = req.user.id;
       

        try {
            const insertMessage = await Message.create({
                senderId: senderId,
                reseverId: reseverId,
                message: {
                    text: messageContent,
                    image: ''
                }
            })
            res.status(201).json({
                success: true,
                message: insertMessage
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: {
                    errorMessage: 'Internal server error'
                }
            })
        }
    
       
}


const getMessageByUser = async(req,res,next)=>{

   try{
    const myId = req.user.id;
    const fdId = req.params.id
   
        let getAllMessage = await Message.find({
            $or: [{
                    $and: [{
                        senderId: {
                            $eq: myId
                        }
                    }, {
                        reseverId: {
                            $eq: fdId
                        }
                    }]
                },
                {
                    $and: [{
                        senderId: {
                            $eq: fdId
                        }
                    }, {
                        reseverId: {
                            $eq: myId
                        }
                    }]
                }
            ]
        });

    
        res.status(200).json({
            success: true,
            message: getAllMessage
        });



   }catch(err){
    res.status(500).json({err:{errorMessage:"Internal server err "}})
   }

        
  
}

const messageSendFile = async (req,res,next)=>{

    try{
      
      
        if(req.file){
            const senderId = req.user.id;
            let encode_image = fs.readFileSync(req.file.path,{encoding: 'base64'})
            
            const insertMessage = await Message.create({
                senderId:senderId,
                reseverId: req.body.reseverId,
                message: {
                    text: '',
                    image: {contentType:req.file.mimetype,content:encode_image}
                }
            })
            res.status(201).json({
                success: true,
                message: insertMessage
            })
               


        }else{
            
            res.json({success:false,message:"Invalid files try again "})
        }
        
     
    }catch(err){
        console.log(err)
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}




const messageSeen = async (req,res,next)=>{

    try{
         const messageId = req.body._id

        await Message.findByIdAndUpdate(messageId,{status:"seen"})
        res.status(20).json({
            success: true
        })
           
    
   
    }catch(err){

        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}

const messageDelivared = async (req,res,next)=>{

    try{
        const messageId = req.body._id

        await Message.findByIdAndUpdate(messageId,{status:"delivared"})
        res.status(20).json({
            success: true
        })
           
    }catch(err){

        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}

module.exports = {
   messageSend,
   getMessageByUser,
   messageSendFile,
   messageSeen,
   messageDelivared,

}
