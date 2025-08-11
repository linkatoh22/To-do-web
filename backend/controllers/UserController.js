const User = require("../models/userModel")
const cloudinary = require("../configs/cloudinary");
const bcrypt = require("bcrypt")


const editProfile = async(req,res,next)=>{
    const {first_name,last_name,username} = req.body;
    
    try{

        if(!first_name || !last_name || !username){
            res.status(404);
            throw Error("Vui lòng chọn đủ tất cả các trường")

        }

        let picUrl = null;
        if (req.file && req.file.buffer) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image", folder: "Users" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                });
            };

            const result = await streamUpload(req.file.buffer);
            picUrl = result.secure_url;
        }
        const userId = req.user.id;
        // const user = await User.findOne({where:{id:userId}});

        // if(!user)  {
        //     res.status(404);
        //     throw Error("Không tìm thấy người dùng")
        // }

        
        const updateData = {
                first_name:first_name,
                last_name:last_name,
                username:username,
        }

        if(picUrl) updateData.avatar = picUrl;

        await User.update(
            updateData,
            {
                where:{id:userId}
            }
        )

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Update user thành công"
        })
        


    }
    catch(error){
        next(error)
    }

}

const getUser = async(req,res,next)=>{
    try{
        const userId= req.user.id;
        const user = await User.findOne({where:{id:userId}});

        if(!user){
            res.status(404);
            throw Error("Không tìm thấy tài khoản...")
        }

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Lấy user thành công",
            user
        })

    }   
    catch(error){
        next(error)
    }

}


const changePassword = async(req,res,next)=>{
    try{
        const {oldPassword,newPassword} = req.body;
        console.log("req.body: ",req.body)
        if(!oldPassword || !newPassword){
            res.status(404);
            throw Error("Vui lòng nhập đủ tất cả trường")
        }

        const userFind = req.user;

        if(!userFind){
            res.status(400);
            throw Error("Phiên đăng nhập hết hạn")
        }
        
        const user = await User.findOne({where:{email:userFind.email}})

        const validPassword = await bcrypt.compare(oldPassword,user.password)

        if(!validPassword){
            res.status(400);
            throw Error("Mật khẩu không khớp");
        }


        const hashedPassword = await bcrypt.hash(newPassword,10);

        
        await User.update(
            { password: hashedPassword },
            { where: { email: userFind.email } }
        );

    
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Đổi mật khẩu thành công"
        })
        

    }
    catch(error){
        next(error);
    }
    
}


module.exports = {editProfile,getUser,changePassword}