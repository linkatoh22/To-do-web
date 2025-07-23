const User= require("./userModel")
const otpVerify  = require("./otpVerifyModel")

//RELATIONSHIP

User.hasMany(otpVerify,{foreignKey:'userId'})
otpVerify.belongsTo(User,{foreignKey:'userId'})


