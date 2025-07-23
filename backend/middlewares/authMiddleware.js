const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const checkRefreshToken = async(id)=>{
    const user = await User.findById(id);
    return user.refreshToken??null;

}
const AuthMiddleware = async (req,res,next)=>{

    try{
        const authHeader = req.headers['authorization'];
        
        const token = authHeader && authHeader.split(' ')[1];
        
        if(!token){
            res.status(404)
            throw Error("Access token missing or invalid");
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_KEY,async (err,decoded)=>{
            try{
                if(err){
                res.status(401)
                throw Error("Token is not valid or expired")
            }
            
            const refreshToken = await checkRefreshToken(decoded._id);
            
            if(!refreshToken){
                res.status(401)
                throw Error("Token is not valid or expired")
            }
            req.user = decoded;
            
            next();
            }
            catch(error){
                
                next(error);
            }
        })
        
    }
    catch(error){
        next(error);
    }
}


module.exports = {AuthMiddleware};