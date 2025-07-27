const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db')

const User = sequelize.define('User',{
    first_name:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    last_name:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    username:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    refresh_token:{
        type: DataTypes.TEXT,
        allowNull:true,
    },
    is_google_user:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    avatar: {
        type: DataTypes.STRING, 
        allowNull: true,
    }

},{
    timestamps:true
})

module.exports = User