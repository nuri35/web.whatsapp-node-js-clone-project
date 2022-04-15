
const User = require("./../models/user_models")



const loginFailed = (req,res,next)=>{
    res.json({success:false,message:"Failure"})
    }
    

const getUserInfo = async(req,res,next)=>{
  
    const data = req.user
    const isAuthInfo = req.isAuthenticated()
    res.json({data,isAuthInfo})


}


const getFriends = async(req,res,next)=>{
  
   try{
       
       const friendGet =  await User.find({'google.googleId':{$ne : req.user.googleId}})
             res.status(200).json(friendGet)
   
   }catch(err){
      res.status(500).json({err:{errorMessage:"Internal server err "}})
   }


}


const logout = (req,res,next)=>{
    req.logout();
    req.session.destroy((err)=>{
        res.clearCookie("connect.sid") 
        res.redirect(process.env.REDIRECT_OUT)
    })
  

}






module.exports = {
    logout,
    getUserInfo,
    loginFailed,
    getFriends,
   
    
  
    

}
