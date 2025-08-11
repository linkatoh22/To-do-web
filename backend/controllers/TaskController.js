const Task = require("../models/taskModel")
const Group = require("../models/groupModel")
const User = require("../models/userModel");
const sequelize = require("../configs/db");
const cloudinary =require("../configs/cloudinary")
const { Op } = require("sequelize");

const createTask = async (req,res,next)=>{

    const {Name,Description,Priority,Status,StartDate,EndDate,GroupId,AdditionalNotes} = req.body;
    
    try{
        const userId = req.user.id;
        if(!Name){
            res.status(400)
            throw Error("Vui lòng nhập tên của task")
        }

        if(GroupId){
            const group = await Group.findOne({where:{id:GroupId,userId:userId}})
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
            groupId:GroupId?? null,
            userId:userId,
            AdditionalNotes:AdditionalNotes??null,
            Status:Status?? null
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
    const {Name,Description,Priority,StartDate,EndDate,GroupId,AdditionalNotes} = req.body;
    
    try{
        const userId = req.user.id;
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
            const group = await Group.findOne({where:{id:GroupId,userId:userId}})
            
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
            groupId:GroupId?? null,
            AdditionalNotes:AdditionalNotes??null
        };
        if (picUrl) updateData.Pic = picUrl;

        try{
            const TaskUpdate = await Task.update(updateData,{where:{id:taskId,userId:userId}})
            
        }
        catch(error){
            res.status(404)
            throw Error("Có lỗi xảy ra khi update")
        }
        

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Update task thành công"
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

const getTaskDetail = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findOne({
            where: { id: taskId },
            include: [
                { model: Group, attributes: ['id', 'Name','Description','Pic'] },
                { model: User, attributes: ['id','first_name','last_name', 'username', 'email','avatar'] }
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
                EndDate:{[Op.not]:null},
                Status: { [Op.ne]: "Hoàn thành" }
            },
            include: [
                { model: Group, attributes: ['id', 'Name','Description','Pic'] },
                { model: User, attributes: ['id','first_name','last_name', 'username', 'email','avatar'] }
            ],
            order:[['EndDate','DESC']],
            limit: 3
            
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
    const userId = req.user.id;
    
    try {
        const countNotAll = await Task.count({
            where: {
                userId: userId,
                Status: "Chưa bắt đầu"
            }
        });


        const countStarted = await Task.count({
            where: {
                userId: userId,
                Status: "Chưa bắt đầu"
            }
        });

        const countNotStarting = await Task.count({
            where: {
                userId: userId,
                Status: "Đang làm"
            }
        });
        

        const countComplete = await Task.count({
            where: {
                userId: userId,
                Status: "Hoàn thành"
            }
        });


        return res.status(200).json({
            status: "Success",
            code: 200,
            data: {
                countNotAll,
                countNotStarting,
                countStarted,
                countComplete

            }
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
                EndDate:{[Op.not]:null},
                Status:"Hoàn thành"
            },
            include: [
                { model: Group, attributes: ['id', 'Name','Description','Pic'] },
                { model: User, attributes: ['id','first_name','last_name', 'username', 'email','avatar'] }
            ],
            order:[['EndDate','ASC']],
            limit: 2
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
                { model: Group, attributes: ['id', 'Name','Description','Pic'] },
                { model: User, attributes: ['id','first_name','last_name', 'username', 'email','avatar'] }
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
                { model: Group, attributes: ['id', 'Name','Description','Pic'] },
                { model: User, attributes: ['id','first_name','last_name', 'username', 'email','avatar'] }
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

const SearchTask = async (req,res,next)=>{
    try{

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
        getAllTaskOfGroup,
        SearchTask
    }