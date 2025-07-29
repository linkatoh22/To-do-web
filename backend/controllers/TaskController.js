const Task = require("../models/taskModel")
const Group = require("../models/groupModel")
const User = require("../models/userModel");
const sequelize = require("../configs/db");


const createTask = async (req,res,next)=>{

    const {Name,Description,Priority,StartDate,EndDate,Pic,GroupId} = req.body;
    
    try{
        const userId = req.user.userId;
        const user = await User.findOne({where:{id:userId}})

        if(!user){
            res.status(400)
            throw Error("Lỗi xác thực...")
        }

        if(!Name){
            res.status(400)
            throw Error("Vui lòng nhập tên của task")
        }

        if(GroupId){
            const group = await Group.findOne({where:{GroupId:GroupId}})
            if(!group){
                res.status(404)
                throw Error("Không tìm thấy Group nào khớp với GroupId")
            }
        }

        let picUrl = null;
        if (req.file && req.file.buffer) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image", folder: "Tasks" },
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

        await Task.create({
            Name:Name,
            Description:Description??null,
            Priority: Priority?? null,
            StartDate:StartDate?? null,
            EndDate:EndDate??null,
            Pic:picUrl,
            GroupId:GroupId?? null,
            Pic:result.secure_url,
            userId:userId
        })

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Tạo task thành công"
        })



    }
    catch(error){
        next(error)
    }
}

const updateTask = async (req,res,next)=>{
    const {taskId} = req.params;
    const {Name,Description,Priority,StartDate,EndDate,Pic,GroupId} = req.body;
    
    try{
        if(!Name){
            res.status(400)
            throw Error("Vui lòng nhập tên của task")
        }


        let picUrl = null;
        if (req.file && req.file.buffer) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image", folder: "Tasks" },
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



        if(GroupId){
            const group = await Group.findOne({where:{GroupId:GroupId}})
            if(!group){
                res.status(404)
                throw Error("Không tìm thấy Group nào khớp với GroupId")
            }
        }
         const updateData = {
            Name:Name,
            Description:Description??null,
            Priority: Priority?? null,
            StartDate:StartDate?? null,
            EndDate:EndDate??null,
            Pic:Pic?? null,
            GroupId:GroupId?? null,
        };
        if (picUrl) updateData.Pic = picUrl;


         await Task.update(updateData,{where:{id:taskId}})

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Tạo task thành công"
        })
    }
    catch(error){
        next(error);
    }
}

const deleteTask = async (req,res,next)=>{
    const {taskId} = req.params;
    try{
        
        if(!taskId){
            res.status(404)
            throw Error("Vui lòng nhập taskId")
        }

        await Task.destroy({where:{id:taskId}})

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Xóa task thành công"
        })

    }
    catch(error){
        next(error)
    }
}


// Lấy chi tiết một task theo taskId
const getTaskDetail = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findOne({
            where: { id: taskId },
            include: [
                { model: Group, attributes: ['id', 'Name'] },
                { model: User, attributes: ['id', 'username', 'email'] }
            ]
        });
        if (!task) {
            res.status(404);
            throw Error("Không tìm thấy task");
        }
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: task
        });
    } catch (error) {
        next(error);
    }
};


//DASHBOARD
//API: Task that deadline are nearest.
const getNearestDeadlineTasks = async (req,res,next)=>{
    const userId = req.user.id;
    try{
        const tasks = await Task.findAll({
            where:{
                userId:userId,
                EndDate:{[Task.sequelize.Op.not]:null}
            },
            include: [
                {
                    model: Group,
                    attributes: ['Name'] // Chỉ lấy tên group
                }
            ],
            order:[['EndDate','ASC']],
            limit:10,
        });

        return res.status(200).json({
            status: "Success",
            code: 200,
            data: tasks
        })
    }
    catch(error){
        next(error)
    }
}

// API: All task of user
const getTasksByUser = async (req, res, next) => {
    const userId = req.user.userId;
    try {
        const tasks = await Task.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Group,
                    attributes: ['Name'] // Chỉ lấy tên group
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

//API: Nearest Complete task
const getNearestDeadlineComplete = async(req,res,next)=>{
    const userId = req.user.id;
    try{
        const tasks = await Task.findAll({
            where:{
                userId:userId,
                EndDate:{[Task.sequelize.Op.not]:null},
                Status:"Hoàn thành"
            },
            include: [
                {
                    model: Group,
                    attributes: ['Name'] // Chỉ lấy tên group
                }
            ],
            order:[['EndDate','ASC']],
            limit:2
        })
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: tasks
        });
    }
    catch(error){
        next(error)
    }
}


// MY TASK
//API: Get all of the task of user ( sort: (Deadline, Status, Priority) )
const getAllTaskOfUser = async(req,res,next)=>{
    const userId = req.user.id;
    const {sortBy,status} = req.query;

    let where = {userId};
    if(status) where.Status = status;

    let order=[]
    
    if(sortBy === 'deadline'){
        order.push(['EndDate','ASC'])
    }

    if(sortBy === 'priorityASC'){
        order.push([
            sequelize.literal(`CASE
                WHEN "Priority" = 'Thấp' THEN 1
                WHEN "Priority" = 'Trung bình' THEN 2
                WHEN "Priority" = 'Cao' THEN 3
                ELSE 4 END `),'ASC'
        ])
    } 
    else if (sortBy === 'priorityDESC'){
        order.push([
            sequelize.literal(`CASE
                WHEN "Priority" = 'Thấp' THEN 1
                WHEN "Priority" = 'Trung bình' THEN 2
                WHEN "Priority" = 'Cao' THEN 3
                ELSE 4 END `),'DESC'
        ])

    }

    try{
        const tasks = await Task.findAll({
            where,
            include: [
                {
                    model: Group,
                    attributes: ['Name'] // Chỉ lấy tên group
                }
            ],
            order
        })
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: tasks
        })
    }
    catch(error){
        next(error)
    }
}

// TASK GROUP
//API2: Get all the the task in the task group ( sort: (Deadline,Status,Priority) )
const getAllTaskOfGroup = async(req,res,next)=>{
    const userId = req.user.id;
    const {sortBy,status,groupId} = req.query;

    let where = {userId};
    if(status) where.Status = status;
    if(groupId) where.groupId = groupId;

    let order=[]
    
    if(sortBy === 'deadline'){
        order.push(['EndDate','ASC'])
    }

    if(sortBy === 'priorityASC'){
        order.push([
            sequelize.literal(`CASE
                WHEN "Priority" = 'Thấp' THEN 1
                WHEN "Priority" = 'Trung bình' THEN 2
                WHEN "Priority" = 'Cao' THEN 3
                ELSE 4 END `),'ASC'
        ])
    } 
    else if (sortBy === 'priorityDESC'){
        order.push([
            sequelize.literal(`CASE
                WHEN "Priority" = 'Thấp' THEN 1
                WHEN "Priority" = 'Trung bình' THEN 2
                WHEN "Priority" = 'Cao' THEN 3
                ELSE 4 END `),'DESC'
        ])

    }

    try{
        const tasks = await Task.findAll({
            where,
            include: [
                {
                    model: Group,
                    attributes: ['Name'] // Chỉ lấy tên group
                }
            ],
            order
        })
        return res.status(200).json({
            status: "Success",
            code: 200,
            data: tasks
        })
    }
    catch(error){
        next(error)
    }
}



module.exports = {
        createTask,
        updateTask,
        deleteTask,
        getTaskDetail,
        getTasksByUser,
        getNearestDeadlineTasks,
        getNearestDeadlineComplete,
        getAllTaskOfUser,
        getAllTaskOfGroup
    }