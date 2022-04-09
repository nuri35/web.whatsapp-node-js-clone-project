

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const User = require("../models/user_models")



module.exports = function(passport){

 
      
        passport.use(new GoogleStrategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
         
        },
       async function(accessToken, refreshToken, profile, done) {
         
      
const {email,picture,email_verified} = profile._json;
       try{
        const user = await   User.findOne({ 'google.googleId' : profile.id })
        if (user) {
  
          if (!user.google.token) {
              user.google.googleId  = profile.id;
              user.google.token = accessToken;
              user.google.name  = profile.displayName
             
              user.google.avatar = picture
            
              await user.save()
              done(null,user.google)
          }
         
          done(null,user.google)
      } else {
          const newUser = new User();

          newUser.google.googleId  = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name  = profile.displayName
          
          newUser.google.avatar = picture
          newUser.google.id=newUser._id,
         
      
          await newUser.save()

          done(null,newUser.google)
         
      }

       }catch(err){
         console.log(err)
       }
          
    
        
        }
        
  
      ));


      passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
      },
      async function(accessToken, refreshToken, profile, done) {

         const {id,email,avatar_url,name,} = profile._json;

       try{

        const userGithub = await   User.findOne({ 'github.githubId' : id })
   

        if (userGithub) {

          
            if (!userGithub.github.token) {
              userGithub.github.githubId  = id;
              userGithub.github.token = accessToken;
              userGithub.github.name  = name
              
              userGithub.github.avatar = avatar_url
              
                await userGithub.save()
                done(null,userGithub.github)
            }
           
            done(null,userGithub.github)
        } else {
            const githubUserNew = new User();

            githubUserNew.github.githubId  = id;
            githubUserNew.github.token = accessToken;
            githubUserNew.github.name  = name;
            githubUserNew.github.avatar = avatar_url
            githubUserNew.github._id=githubUserNew._id,

            await githubUserNew.save()

            done(null,githubUserNew.github)
           
        }


       }catch(err){
         console.log(err)
       }

        
      }

    ));
      passport.serializeUser(function(user, done) {
  
      done(null, user); 
       
      
      });
    
      passport.deserializeUser(function(user, done) {
       
      done(null,user)
       
      });


}

