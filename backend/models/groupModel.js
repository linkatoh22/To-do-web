const {DataTypes} = require('sequelize')
const sequelize = require("../configs/db")

const Group = sequelize.define('Groups',{
    Name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    Description:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    Pic:{
        type:DataTypes.STRING(255),
        allowNull:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'id'
        }
    },
})

module.exports = Group;