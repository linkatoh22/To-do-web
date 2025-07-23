const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const {sendEmailVerify} = require("./emailController")
const {generateAccessToken,generateRefreshToken} = require("../utils/generateToken")

const logIn = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400)
            throw new Error("Vui lòng nhập đủ tất cả các trường")
        }

        const user = await User.findOne({where:{email:email}})

        if(!user){
            res.status(404)
            throw new Error("Người dùng này không tổn tài")
        }

        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            res.status(400)
            throw new Error("Sai mật khẩu")
        }
        
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await User.update(
            { refreshToken: refreshToken },
            { where: { id: user.id } }
          );
        
        const Secure = process.env.SECURE == "true"? true:false;
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure: Secure, 
            sameSite: process.env.SAME_SITE,
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Đăng nhập thành công",
            token:{
                accessToken,
                refreshToken
            }
        })

    }
    catch(error){
        next(error)
    }
}
const signUp =  async(req,res,next)=>{
    try{
        const {firstName,lastName,username,email,password} = req.body;
        
        if(!firstName && !lastName && !username && !email && !password){
            res.status(404)
            throw new Error("Thiếu các trường cần thiết.")
        }

        const user = await User.findOne({
            where: { email: email, verified: true }
          })

        if(user){
            res.status(400)
            throw new Error("Email đã tồn tại!")
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //Trong TH: đã gửi mã giờ đăng ký nữa
        var userAvailable = await User.findOne({
            where: { email: email}
          })

        if(!userAvailable){
            userAvailable = await User.create({
                first_name:firstName,
                last_name: lastName,
                username:username,
                email:email,
                password:hashedPassword
            })

            
        }
        sendEmailVerify({email:email, userId: userAvailable.id},res)

        //Gọi gửi email
        


    }
    catch(error){
        next(error)
    }

}
const changePassword = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(404);
            throw Error("Vui lòng nhập đủ tất cả trường")
        }
        const hashedPassword = bcrypt.hash(password,10)
        try{
            await User.update(
                { email: email },
                { where: { password: hashedPassword } }
            );
        }
        catch(error){
            res.status(400);
            throw Error("Không tìm thấy người dùng")
        }
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Đổi mật khẩu thành công"
        })
        

    }
    catch(error){
        next(error);
    }
    
}
module.exports = {signUp,logIn}