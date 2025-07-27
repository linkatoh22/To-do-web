const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userModel")


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
},
    async(accessToken,refreshToken,profile,done)=>{
        const email = profile.emails[0].value;

        let user = User.findOne({where:{email:email}})


        const fullName = profile.displayName || "";
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts.slice(0, -1).join(" "); // Họ và tên đệm
        const lastName = nameParts.slice(-1).join(" ");     

        if(!user){

            user = await User.create({
                first_name : firstName,
                last_name: lastName,
                username: profile.displayName,
                avatar: profile.photos[0].value,
                email:email,
                verified:true,
                is_google_user:true
            })
            return done(null,user);
        }

        if(user.verified == false){

            await User.update(
                { verified:true, is_google_user:true }
            ,
                {where:{email:email}}
            )

            return done(null,user);

        }

    }
))

module.exports = passport;