const multer = require("multer")
const path = require("path")
const storage = multer.memoryStorage();

const fileFilter = (req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();
    
    if(![".jpg",".jpeg",".png"].includes(ext)){
        return cb(new Error("Chỉ hỗ trợ ảnh jpg, jpeg,png"),false)
    }

    cb(null,true);

}

module.exports = multer({storage,fileFilter});