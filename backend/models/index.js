const User= require("./userModel")
const otpVerify  = require("./otpVerifyModel")
const resetPassToken =require("./resetPassTokenModel")


//RELATIONSHIP

//otpVerify
User.hasMany(otpVerify,{foreignKey:'userId'})
otpVerify.belongsTo(User,{foreignKey:'userId'})

//resetPassToken
User.hasMany(resetPassToken,{foreignKey:'userId'})
resetPassToken.belongsTo(User,{foreignKey:'userId'})


