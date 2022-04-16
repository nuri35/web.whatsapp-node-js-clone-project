var client = require('./../db/redis_config');
const shortid = require('shortid');


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
        res.status(200).json({success:true,message:"success message"})
       

    }catch(err){
        console.log(err)
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}


const getMessageByUser = async(req,res,next)=>{
//redis get 
    try{
        

        const getMessage = await client.hVals(req.params.id);
      
           
        const message = getMessage.filter(m => {
          let parseMessage = JSON.parse(m)
            if(parseMessage.senderId == req.user.id){
                return parseMessage
            }
          
        } );

       res.status(200).json({message})
    

    }catch(err){
        console.log(err)
        res.status(500).json({err:{errorMessage:"Internal server err "}})
    }
}




module.exports = {
   messageSend,
   getMessageByUser,
    
}
