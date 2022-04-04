const router = require("express").Router()
const authcontoller = require("../controller/authController")
const passport = require("passport")



require("./../controller/passportStrategy")(passport)



//phone login-- daha sonra 


//google login bu logın turu gelıstırılecek
router.get("/user",authcontoller.getUserInfo)

router.get("/failed",authcontoller.loginFailed)


router.get("/google",passport.authenticate("google",{scope:["email","profile"]})) 

router.get("/google/callback",passport.authenticate("google",{
    successRedirect: process.env.CLİENT_URL,
    failureRedirect:"/auth/failed"
}))



//logout
router.get("/logout",authcontoller.logout)



module.exports=router