
const User = require("./../models/user_models")



const loginFailed = (req,res,next)=>{
    res.json({success:false,message:"Failure"})
    }
    

const getUserInfo = async(req,res,next)=>{
    const data = req.user
    const isAuthInfo = req.isAuthenticated()
    res.json({data,isAuthInfo})


}

const logout = (req,res,next)=>{

    req.logout();
    req.session.destroy((err)=>{
        res.clearCookie("connect.sid") 
        res.redirect(CLİENT_URL)
    })
  

}






module.exports = {
    logout,
    getUserInfo,
    loginFailed,
   
    
  
    

}
