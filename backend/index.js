const express = require("express")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


app.get('/',(req,res)=>{

    res.send("Hello,world");
})

app.listen(port,()=>{
    console.log(`Server are runnign at port: ${port} `);
})

