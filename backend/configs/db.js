
// const {Pool} =require("pg");

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database:process.env.DATABASE,
//     port:process.env.DBPORT,
//     password:process.env.PASSWORD,

// })

// pool.on("connect",()=>{

//     console.log("Connection pool established with Database")
// })

// module.exports = pool;

const {Sequelize} = require("sequelize");

const sequelize = new Sequelize (process.env.DATABASE, process.env.USER,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:'postgres',
    logging:false,
});

module.exports = sequelize;