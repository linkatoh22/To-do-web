const Group = require("../models/groupModel");
const Task = require("../models/taskModel")
const cloudinary = require("../configs/cloudinary");

const getGroupsByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const groups = await Group.findAll({
            where: { userId: userId }
        });
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: groups
        });
    } catch (error) {
        next(error);
    }
};


const createGroup = async (req,res,next)=>{
    const {Name,Description} =req.body;
    try{
        const userId = req.user.id;
        if(!Name){
            res.status(400)
            throw Error("Vui lòng nhập name của Group")
        }

        let picUrl = null;
        if (req.file && req.file.buffer) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image", folder: "Group" },
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

        await Group.create({
            Name:Name,
            Description:Description??null,
            Pic:picUrl?? null,
            userId:userId
            
        })

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Tạo group thành công"
        })

    }
    catch(error){
        next(error)
    }
}

const editGroup = async (req, res, next) => {
    const { Name, Description } = req.body;
    const { groupId } = req.params;
    try {
        const userId = req.user.id;
        if (!Name) {
            res.status(400);
            throw Error("Vui lòng nhập name của Group");
        }

        let picUrl = null;
        if (req.file && req.file.buffer) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image", folder: "Group" },
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

        const updateData = {
            Name: Name,
            Description: Description ?? null
        };
        if (picUrl) updateData.Pic = picUrl;

        const [affectedRows] = await Group.update(updateData, {
            where: { id: groupId, userId: userId }
        });

        if (affectedRows === 0) {
            res.status(404);
            throw Error("Không tìm thấy group để cập nhật");
        }

        return res.status(200).json({
            status: "Success",
            code: 200,
            message: "Update group thành công"
        });
    } catch (error) {
        next(error);
    }
};

const deleteGroup = async (req, res, next) => {
    const { groupId } = req.params;
    try {
        const userId = req.user.id;

        await Task.update(
            { groupId: null },
            { where: { groupId: groupId, userId: userId } }
        );

        const deletedRows = await Group.destroy({ where: { id: groupId, userId: userId } });

        if (deletedRows === 0) {
            res.status(404);
            throw Error("Không tìm thấy group để xóa");
        }

        return res.status(200).json({
            status: "Success",
            code: 200,
            message: "Xóa group thành công"
        });
    } catch (error) {
        next(error);
    }
};

const getGroupDetail = async (req, res, next) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    try {
        console.log("groupId:  ",groupId)
        console.log("userId:  ",userId)
        const group = await Group.findOne({
            where: { id: groupId, userId: userId }
        });
        if (!group) {
            res.status(404);
            throw Error("Không tìm thấy group");
        }
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: group
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {createGroup,editGroup,deleteGroup,getGroupsByUser,getGroupsByUser,getGroupDetail}