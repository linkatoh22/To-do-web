const User= require("./userModel")
const otpVerify  = require("./otpVerifyModel")
const Group = require("./groupModel")
const Task = require("./taskModel")
const resetPassToken =require("./resetPassTokenModel")


//RELATIONSHIP

//otpVerify -> User
User.hasMany(otpVerify,{foreignKey:'userId'})
otpVerify.belongsTo(User,{foreignKey:'userId'})

//resetPassToken -> User
User.hasMany(resetPassToken,{foreignKey:'userId'})
resetPassToken.belongsTo(User,{foreignKey:'userId'})

//Tasks -> Users
User.hasMany(Task,{foreignKey:'userId'})
Task.belongsTo(User,{foreignKey:'userId'})

//Tasks -> Groups
Group.hasMany(Task,{foreignKey:'groupId'})
Task.belongsTo(Group,{foreignKey:'groupId'})

//Group -> Users
User.hasMany(Group,{foreignKey:'userId'})
Group.belongsTo(User,{foreignKey:'userId'})


module.exports = {
    User,
    otpVerify,
    Group,
    Task,
    resetPassToken
}
