
const User = require("./../models/user_models")
const Message = require('../models/messenger_models');

const loginFailed = (req,res,next)=>{
    res.json({success:false,message:"Failure"})
    }
    

const getUserInfo = async(req,res,next)=>{
  
    const data = req.user
    const isAuthInfo = req.isAuthenticated()
    res.json({data,isAuthInfo})


}


const getLastMessage = async (myId, fdId) => {
    const msg = await Message.findOne({
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
    }).sort({
        updatedAt: -1
    });

    return msg;
}

const getFriends = async(req,res,next)=>{
    let fndMsg = [];
    const myId = req.user.id;
   try{
    
       const friendGet =  await User.find({_id:{$ne : req.user.id}})
      
       for (let i = 0; i < friendGet.length; i++) {
        let lmsg = await getLastMessage(myId, friendGet[i].id);
        fndMsg = [...fndMsg, {
            fndInfo: friendGet[i],
            msgInfo: lmsg
        }]
    }

        res.status(200).json(fndMsg)
   
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
