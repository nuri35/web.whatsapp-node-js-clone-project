
const client = require('./../db/redis_config');


const dowloadFile = async (req,res,next)=>{
   try{
  
   
    let messagebyuser = []
    const getMessage = await client.hVals(req.body.whoReseverId);
 
   if(getMessage.length > 0){


    getMessage.map((m)=>{
        let messParse = JSON.parse(m)
         return messParse
         
      })
      .filter((mfilter) =>{
          if(mfilter.senderId == req.user.id && mfilter.message.file !== "" && mfilter.message.file === req.body.whichFile){
           
        messagebyuser.push(mfilter.message.file)
         
          }
       
      })

     res.download(`${process.env.UPLOADS_FILES}/${messagebyuser[0]}`)
     
     

   }else{
    res.sendStatus(404);
    
   }
      

   } catch(err){
   
    res.sendStatus(500);
    
   }
  

}


module.exports = {
    dowloadFile,
   
 }
 