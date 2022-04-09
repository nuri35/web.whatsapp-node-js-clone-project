const mongoose = require("mongoose")

    const userSchema = new mongoose.Schema({
    
      google :{
        id:{
            type:mongoose.ObjectId,
          },
        googleId :{
            type:String,
          
        },
        token : String,
        name :String,
        avatar :String,
       

      } ,
      github :  {
        id:{
            type:mongoose.ObjectId,
          },
        githubId :{
            type:String,
         
        },
        token : String,
        name :String,
        avatar :String,
       

      }
  

   
    
      },{collection:"user",timestamps:true});
      const user = mongoose.model("user",userSchema)
      module.exports = user; 