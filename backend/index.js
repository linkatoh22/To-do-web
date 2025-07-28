const express = require("express")
require('dotenv').config();
const pool = require("./configs/db")
const cors = require("cors")

const authenticateRoutes = require("./routes/AuthenticateRoute")
const userRoutes = require("./routes/UserRoute")
const taskRoutes = require("./routes/TaskRoute")
const groupRoutes = require("./routes/GroupRoute")


const errorHandler  = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser");
const sequelize = require("./configs/db");
const User = require("./models/userModel");



const app = express();
const port = process.env.PORT || 3000;


require("./models"); // Thêm dòng này để thiết lập các quan hệ giữa các model
//Connect to PostgreSQL
(async()=>{
    try{
        await sequelize.authenticate();
        console.log(`Đã kết nối database thành công!`)
        await sequelize.sync({ alter: true });

        

    }
    catch(error){
        console.error(`Lỗi kết nối hoặc sync:`,error)
    }

})();

app.use(cors())
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth",authenticateRoutes)
app.use("/api/user",userRoutes)
app.use("/api/task",taskRoutes)
app.use("/api/group",groupRoutes)



//Error handler
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server are running at port: ${port} `);
})

