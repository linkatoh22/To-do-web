const {transporter} = require("../configs/transporter")
const bcrypt = require("bcrypt")
const User  = require("../models/userModel")
const otpVerify = require("../models/otpVerifyModel")
const crypto = require("crypto");
const sendEmailVerify = async ({email,userId},res,next)=>{
    const otp = `${Math.floor(1000+Math.random()*9000)}`
    const mailOptions = {
        from: process.env.User,
        to:email,
        subject:"OTP xác nhận của bạn",
        html:`<p>Chào! Bạn vừa sử dụng email này để đăng ký website DCAT Store của chúng mình đây là mã OTP xác thực của bạn:   </p>\
        <h1>${otp}</h1>
        <p> OTP này sẽ hết hạn trong 5 phút</p>`
    }

    const hashedOTP = await bcrypt.hash(otp,10);

    await otpVerify.destroy({
        where: { userId: userId }
    })

    const otpCreate = await otpVerify.create({
        otp:hashedOTP,
        createdAt:Date.now(),
        expiresAt: Date.now() + 3600000,
        userId:userId
    })
    await transporter.sendMail(mailOptions)
    return res.status(200).json({
        status:"Success",
        code:200,
        message:"Verification otp email sent",
        data:{
            email,
            userId
        },
    })
    


}

const verifyOTP = async (req,res,next)=>{
    try{
        
        const {userId,otp} = req.body;
        console.log("userId: ",userId)
        console.log("otp: ",otp)
        if(!userId || !otp){
            res.status(400)
            throw new Error("Thiếu các trường cần thiết.")
        }
        const findOTP = await otpVerify.findOne({
            where:{userId:userId}
        })
        
        if(!findOTP){
            res.status(404)
            throw new Error("Mã OTP không hợp lệ")
        }
        
        if(findOTP.expiresAt < Date.now()){
            await otpVerify.destroy( {
                where: { userId: userId 

                }})
            res.status(401)
            throw new Error ("Mã OTP đã hết hạn.")
        }


        const validOTP = await bcrypt.compare(otp,findOTP.otp)

        if(!validOTP){
            res.status(401)
            throw new Error("Mã OTP không hợp lệ.")
        }


        await User.update(
            { verified: true },
            { where: { id: userId } }
          );
        
        await otpVerify.destroy({
            where: { userId: userId }
        })
    
        
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"User email verified successfully"
        })




    }
    catch(error){
        next(error);
    }
}


const reSendOTP = async (req,res,next)=>{

    try{
        const {email}  = req.body;

        if(!email){
            
            res.status(400)
            throw Error("Vui lòng nhập đủ các trường.");
        }
        
            const user = await User.findOne({where:{email:email}});

            if (!user) {
                res.status(404);
                throw new Error("Người dùng không tồn tại.");
            }
            
            // await otpVerify.destroy({
            //     where: { userId: user.id }
            // })

            sendEmailVerify({email:email, userId: user.id},res)
    }
    catch(error){
        next(error)
    }
    
}


// const sendPassLinkEmail = async(req,res,next)=>{
//     try{
//         const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//         console.log("sendResetLinkToEmail: ", fullUrl);


//         const {email} = req.body;
//         const user = await User.findOne({where:{email:email}});

//         if(!user){
//             res.status(400)
//             throw Error("Người dùng không tồn tại");
//         }

//         const token = crypto.randomBytes(32).toString("hex");
//         const tokenExpiry = Date.now()+3600000;

//         const newUserResetToken = new ResetToken({ 
//             email:email,
//             userId:user._id,
//             resetToken:token,
//             resetTokenExpiry: tokenExpiry
//         });

//         await newUserResetToken.save();
//         const resetUrl = `${process.env.ORIGIN}/reset-password/${token}`
//         await transporter.sendMail({
//             to:email,
//             subject:"Đổi mật khẩu",
//             html:`
//                 <div>
//                     Đây là link sử dụng để đổi mật khẩu của bạn:
//                     <a href="${resetUrl}">Bấm vào để đổi mật khẩu</a>
//                 </div>
//             `
//         });

//         return res.status(200).json({
//             status:"Success",
//             code:200,
//             message:"Email xác  nhận đã gửi",
//         })
 
//     }
//     catch(error){
//         next(error)
//     }
// }


// const changePassword= async(req,res,next)=>{
//     try{

//         const {token} = req.params;
//         const {password} = req.body;
//         const ResetTokenAvailable = await ResetToken.findOne({
//             resetToken:token,
//             resetTokenExpiry:{$gt:Date.now()}
//         })

//         if(!ResetTokenAvailable){
//             res.status(400)
//             throw Error("Link đã hết hạn...");
//         }
        
//         const hashedPassword = await bcrypt.hash(password,10);
        

//         await User.update(
//                         { id:ResetTokenAvailable.userId },
//                         { where: { password: hashedPassword } }
//                     );
        
//         await user.save();
//         ResetTokenAvailable.resetTokenExpiry = Date.now();
//         await ResetTokenAvailable.save();


//         return res.status(200).json({
//             message:"Change Password Successfully",
//             status:"Success",
//             code:200,
            
        
//         });

//     }
//     catch(error){
//         next(error)
//     }
// }

module.exports = {sendEmailVerify,verifyOTP,reSendOTP}