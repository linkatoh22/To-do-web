const {DataTypes} = require('sequelize')
const sequelize = require("../configs/db")

const otpVerify  = sequelize.define('otp_verify',{
    otp:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:true
    },
    expiresAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'id'
        }
    }
})

module.exports = otpVerify
