const {DataTypes} = require('sequelize')
const sequelize = require("../configs/db")


const resetPassToken = sequelize.define('resetPass_Token',{
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    resetToken:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:true
    },
    resetTokenExpiry:{
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

module.exports = resetPassToken;