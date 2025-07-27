const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken =(user)=>{
    const accessToken = jwt.sign(
            {id:user.id, email:user.email,username:user.username},
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn:"30m"}
    );
    
    return accessToken;

}

const generateRefreshToken = (user) =>{
    const refreshToken = jwt.sign(
        {id:user.id, email:user.email,username:user.username},
        process.env.REFRESH_TOKEN_KEY,
        {expiresIn:"7d"}
    );
    return refreshToken

}
module.exports = {generateAccessToken,generateRefreshToken};