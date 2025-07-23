const nodemailer= require("nodemailer")
let transporter = nodemailer.createTransport({
    service:"gmail",
    secure:true,
    logger:true,
    debug:true,
    secureConnection:false,
    auth:{
        user: process.env.USER_NODEMAILER,
        pass:process.env.PASS_NODEMAILER
    },
    tls:{
        rejectUnauthorized:true
    }

})

module.exports = {transporter}