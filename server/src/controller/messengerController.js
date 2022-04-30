const { createConnectedClient, clientClose} = require('./../db/redis_config');
const shortid = require('shortid');
const _ = require("lodash")
const fs = require("fs")


const messageSend = async(req,res,next)=>{

    try{
        const client = await createConnectedClient()
         await client.hSet(`${req.body.reseverId}`,
        shortid.generate(),
        JSON.stringify({
            message:{
                text:req.body.messageContent,
                image:""
            },
            when:Date.now(),
            senderId:req.body.senderId
        })

        );
        await clientClose()
        res.status(200).json({message:{
            message:{
                text:req.body.messageContent,
                image:""
            },
            when:Date.now(),
            senderId:req.body.senderId

        }
          
        })

    
       
    }catch(err){
       
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}


const getMessageByUser = async(req,res,next)=>{

    try{
        const client = await createConnectedClient()
        let messagebyuser = []
        const getMessage = await client.hVals(req.params.id);
        
         getMessage.map((m)=>{
          let messParse = JSON.parse(m)
            return messParse
        }).filter(mfilter =>{
            if(mfilter.senderId == req.user.id){
               
                    messagebyuser.push(mfilter)  
            }
        })
        
        const getReceiveMe = await client.hVals(req.user.id);

         getReceiveMe.map((m)=>{
          let  parseReceive = JSON.parse(m)
            return parseReceive
        }).filter(mfilt=>{
           
            if(mfilt.senderId == req.params.id){
                messagebyuser.push(mfilt)
            }
        })
    await clientClose()

        
    res.status(200).json({message:_.orderBy(messagebyuser,"when","asc")})
    

    }catch(err){
      
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}

const messageSendFile = async (req,res,next)=>{

    try{
      
      
        if(req.file){
        
            let encode_image = fs.readFileSync(req.file.path,{encoding: 'base64'})
                const client = await createConnectedClient()
                await client.hSet(`${req.body.reseverId}`,
                shortid.generate(),
                JSON.stringify({
                    message:{
                        text:"",
                        image: {contentType:req.file.mimetype,content:encode_image}, 
                    },
                    when:Date.now(),
                    senderId:req.body.senderId
                })
        
                );
               
            res.json({success:true,message:{
                message:{
                    text:"",
                    image: {contentType:req.file.mimetype,content:encode_image},
                },
                when:Date.now(),
                senderId:req.body.senderId
            }
            
            }) 
        
            await clientClose()


        }else{
            res.json({success:false,message:"Invalid files try again "})
        }
        
     
    }catch(err){

        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}


module.exports = {
   messageSend,
   getMessageByUser,
   messageSendFile,
}
