const {constant} = require("../constant")
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    switch(statusCode){
        case constant.VALIDATION_ERROR:
            res.json({
                status:"FAILED",
                title:"Validation Failed",
                code:statusCode,
                
                messageShow:err.messageShow || "Có lỗi xảy ra",
                message:err.message,
                stackTrace:err.stack
            });
            break;
        case constant.NOT_FOUND:
            res.json({
                status:"FAILED",
                title:"Not Found",
                messageShow:err.messageShow || "Có lỗi xảy ra",
                message:err.message,
                stackTrace:err.stack});
                break;
        case constant.UNAUTHORIZED:
            res.json({status:"FAILED",title:"UNAUTHORIZED",
                messageShow:err.messageShow || "Có lỗi xảy ra",
                message:err.message,
                stackTrace:err.stack});
                break;
        case constant.FORBIDDEN:
            res.json({status:"FAILED",
                title:"FORBIDDEN",
                messageShow:err.messageShow || "Có lỗi xảy ra",
                message:err.message,
                stackTrace:err.stack});
                break;
                case constant.SERVER_ERROR:
                    res.json({status:"FAILED",
                    title:"SERVER ERROR",
                    messageShow:err.messageShow || "Có lỗi xảy ra",
                    message:err.message,
                    stackTrace:err.stack});     
                    break;        
        default:
            console.log("No error, All good!");
            break;
    }

}

module.exports = errorHandler;