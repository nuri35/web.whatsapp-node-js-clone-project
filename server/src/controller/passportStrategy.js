

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/user_models")
const bcrypt = require("bcrypt")


module.exports = function(passport){

        
      
        passport.use(new GoogleStrategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
          passReqToCallback : true
        },
       async function(req,accessToken, refreshToken, profile, done) {
         
      
const {email,picture,email_verified} = profile._json;

console.log(email,picutre,email_verified)

//   if (!req.user) { // req.user undefıned ıse  bura ıslıcek

//         const user = await   User.findOne({ 'google.idProf' : profile.id })
       

//         if (user) {

//             // if there is a user id already but no token (user was linked at one point and then removed)
//             if (!user.google.token) {
//                 user.google.idProf    = profile.id;
//                 user.google.token = accessToken;
//                 user.google.name  =  profile.displayName
//                 user.google.email = email
//                 user.google.avatar = picture
               

//                 await user.save()

//                 done(null,user.google)
//             }

//             done(null,user.google)
//         } else {
//             const newUser = new User();

//             newUser.google.idProf    = profile.id;
//             newUser.google.token = accessToken;
//             newUser.google.name  =  profile.displayName
//             newUser.google.email = email
//             newUser.google.avatar = picture
//             newUser.google.id=newUser._id,

//             await newUser.save()

//             done(null,newUser.google)
           
//         }
 

// } else {
//     // user already exists and is logged in, we have to link accounts
//     const user   = req.user; // pull the user out of the session

//     user.idProf    = profile.id;
//     user.token = accessToken;
//     user.name  =profile.displayName
//     user.email = email
//     user.avatar = picture
    
//     await user.save()
//     done(null,user)

// }




        }
  
      ));



        passport.serializeUser(function(user, done) {
            done(null, user); 
          });
        
          passport.deserializeUser(function(user, done) {
            done(null, user); 
           
          });


}

