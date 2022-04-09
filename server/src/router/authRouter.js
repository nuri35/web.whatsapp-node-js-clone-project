const router = require("express").Router()
const authcontoller = require("../controller/authController")
const passport = require("passport")
let redirect_url = "http://localhost:3000/Chat"

require("./../controller/passportStrategy")(passport)



//phone login-- daha sonra 


//google login bu logın turu gelıstırılecek
router.get("/user",authcontoller.getUserInfo)

router.get("/failed",authcontoller.loginFailed)


router.get("/google",passport.authenticate("google",{scope:["email","profile"]})) 

router.get("/google/callback",passport.authenticate("google",{
    successRedirect: redirect_url,
    failureRedirect:"/auth/failed"
}))


router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', {
    successRedirect: redirect_url,
    failureRedirect:"/auth/failed"
    
}));


//logout
router.get("/logout",authcontoller.logout)



module.exports=router