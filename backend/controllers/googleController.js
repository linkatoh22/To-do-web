const { generateAccessToken,generateRefreshToken } = require("../utils/generateToken")
const User = require("../models/userModel")
const googleCallback = async (req,res,next) =>{
   
    try{
        

        const user = req.user;
        
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        await User.update(
            { refresh_token: refreshToken },
            { where: { id: user.id } }
          );

        const Secure = process.env.SECURE == "true"? true:false;

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure: Secure, 
            sameSite: process.env.SAME_SITE,
            maxAge:7 * 24 * 60 * 60 * 1000,
        })
       
        // return res.status(200).json({status:"Success",
        //     code:200,
        //     message:"Đăng nhập thành công",
        //     user})
        return res.redirect(`${process.env.ORIGIN}/google-success?accessToken=${accessToken}`);

    }   
    catch(error){
        next(error);
    }
}
module.exports = {googleCallback};