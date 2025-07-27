const { generateAccessToken,generateRefreshToken } = require("../../utils/TokenFunc");
const User = require("../../models/userModel")
const googleCallback = async (req,res,next) =>{

    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("googleCallback: ", fullUrl);

        const user = req.user;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await User.update(
            { refreshToken: refreshToken },
            { where: { _id: user._id } }
          );

        const Secure = process.env.SECURE == "true"? true:false;
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure: Secure, 
            sameSite: process.env.SAME_SITE,
            maxAge:7 * 24 * 60 * 60 * 1000,
        })
        res.redirect(`${process.env.ORIGIN}/google-success?accessToken=${accessToken}`);

    }   
    catch(error){
        next(error);
    }
}
module.exports = {googleCallback};