const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const checkRefreshToken = async(id)=>{
    const user = await User.findOne(    {where: {id:id} } );
   
    return user.refresh_token ?? null ;

}

const AuthMiddleware = async (req,res,next)=>{

    try{
        const authHeader = req.headers['authorization'];
        
        const token = authHeader && authHeader.split(' ')[1];
        
        if(!token){
            console.log("Access token thiếu hoặc không hợp lệ")
            res.status(404)
            throw Error("Access token thiếu hoặc không hợp lệ");
            
        }

        jwt.verify(token,process.env.ACCESS_TOKEN_KEY,async (err,decoded)=>{
            try{
                
                if(err){
                    //HERRE
                    res.status(401);
                    throw Error("Token không hợp lệ hoặc đã hết hạn");
                }
            
                const refreshToken = await checkRefreshToken(decoded.id);
            
                if(!refreshToken){
                   
                    res.status(401)
                    throw Error("Phiên đăng nhập hết hạn")
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