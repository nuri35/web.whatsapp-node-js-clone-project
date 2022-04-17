var client = require('./../db/redis_config');
const shortid = require('shortid');
const _ = require("lodash")

const messageSend = async(req,res,next)=>{

    try{
        
         await client.hSet(`${req.body.reseverId}`,
        shortid.generate(),
        JSON.stringify({
            message:req.body.messageContent,
            when:Date.now(),
            senderId:req.body.senderId
        })

        );
        res.status(200).json({message:{message:req.body.messageContent,when:Date.now(),senderId:req.body.senderId}})
       

    }catch(err){
        console.log(err)
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}


const getMessageByUser = async(req,res,next)=>{
//redis get 
    try{
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
        
    res.status(200).json({message:_.orderBy(messagebyuser,"when","asc")})
    

    }catch(err){
      
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}

const messageSendİmage = async(req,res,next)=>{

    try{
      
        console.log(req.body)
    }catch(err){
       
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}


module.exports = {
   messageSend,
   getMessageByUser,
   messageSendİmage,
}
