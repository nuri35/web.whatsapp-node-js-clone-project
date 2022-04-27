const { createConnectedClient, clientClose} = require('./../db/redis_config');
const shortid = require('shortid');
const _ = require("lodash")
const path = require("path");


const messageSend = async(req,res,next)=>{

    try{
        const client = await createConnectedClient()
         await client.hSet(`${req.body.reseverId}`,
        shortid.generate(),
        JSON.stringify({
            message:{
                text:req.body.messageContent,
                file:"",
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
                file:"",
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
            const client = await createConnectedClient()
            const filetypesImage = /jpeg|jpg|png/;
            const extnameControl = filetypesImage.test(path.extname(req.file.originalname).toLowerCase());

            if(!extnameControl){

                    
                await client.hSet(`${req.body.reseverId}`,
                shortid.generate(),
                JSON.stringify({
                    message:{
                        text:"",
                        image:"",
                        file:req.file.filename
                    },
                    when:Date.now(),
                    senderId:req.body.senderId
                })
        
                );
                
            res.json({success:true,message:{
                message:{
                    text:"",
                    image:"",
                    file:req.file.filename
                },
                when:Date.now(),
                senderId:req.body.senderId
            }
            
            }) 
        


            }else{
                await client.hSet(`${req.body.reseverId}`,
                shortid.generate(),
                JSON.stringify({
                    message:{
                        text:"",
                        file:"",
                        image:req.file.filename
                    },
                    when:Date.now(),
                    senderId:req.body.senderId
                })
        
                );
               
            res.json({success:true,message:{
                message:{
                    text:"",
                    file:"",
                    image:req.file.filename
                },
                when:Date.now(),
                senderId:req.body.senderId
            }
            
            }) 
            }
       
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
