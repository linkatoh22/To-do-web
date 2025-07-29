const {DataTypes} = require('sequelize')
const sequelize = require("../configs/db")


const Task = sequelize.define('Tasks',{
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    Description:{
        type:DataTypes.STRING(255),
        allowNull:true,
    },
    AdditionalNotes:{
        type:DataTypes.STRING(255),
        allowNull:true,
    },
    Priority:{
        type: DataTypes.ENUM('Thấp','Trung bình','Cao'),
        allowNull: true,
    },
    Status:{
        type: DataTypes.ENUM("Chưa bắt đầu", "Đang làm","Hoàn thành"),
        allowNull: true,
    },
    StartDate:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    EndDate:{
        type:DataTypes.DATE,
        allowNull:true,
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
    groupId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:'Groups',
            key:'id'
        }
    }
})

module.exports = Task;