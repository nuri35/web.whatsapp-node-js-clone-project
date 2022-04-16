const router = require("express").Router()
const authcontoller = require("../controller/authController")
const passport = require("passport")
let redirect_url = "http://localhost:3000/Chat"

require("./../controller/passportStrategy")(passport)



router.get("/user",authcontoller.getUserInfo)

router.get("/failed",authcontoller.loginFailed)

router.get("/getFriends",authcontoller.getFriends)

router.get("/google",passport.authenticate("google",{scope:["email","profile"]})) 

router.get("/google/callback",passport.authenticate("google",{
    successRedirect: redirect_url,
    failureRedirect:"/auth/failed"
}))




//logout
router.get("/logout",authcontoller.logout)



module.exports=router