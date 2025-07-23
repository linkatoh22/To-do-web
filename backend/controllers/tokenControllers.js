const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const  { generateAccessToken } = require("../utils/generateToken");
const handleAccessToken = async (req,res,next)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            res.status(404)
            throw Error("Không tìm thấy Refresh Token.")
        }
        
        let decoded;

            try {
                decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Refresh token đã hết hạn." });
                }
                return res.status(401).json({ message: "Refresh token không hợp lệ." });
            }
        
        const user = await User.findOne({refreshToken:refreshToken});

        const accessToken = generateAccessToken(user);
        return res.status(200).json({
            message:"Generate Access Token Successfully",
            status:"Success",
            code:200,
            accessToken:accessToken
        })
    
    }
    catch(error){
        next(error)
    }
}

module.exports= {handleAccessToken};