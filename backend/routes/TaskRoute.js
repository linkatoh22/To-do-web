const express = require("express")
const router = express.Router();
const {AuthMiddleware} = require("../middlewares/authMiddleware")

const {createTask,updateTask,
                deleteTask,
                getTaskDetail,
                getTasksByUser,
                getNearestDeadlineTasks,
                getNearestDeadlineComplete,
                getAllTaskOfUser,
                getAllTaskOfGroup
        } = require("../controllers/TaskController")


router.route("/create-task").post(AuthMiddleware,createTask)
router.route("/update-task/:taskId").put(AuthMiddleware,updateTask)
router.route("/delete-task/:taskId").delete(AuthMiddleware,deleteTask)



router.route("/get-task-detail/:taskId").get(AuthMiddleware,getTaskDetail)


//Dashboard:
router.route("/get-task-user").get(AuthMiddleware,getTasksByUser)
router.route("/get-nearest-deadline-tasks").get(AuthMiddleware,getNearestDeadlineTasks)
router.route("/get-nearest-deadline-complete").get(AuthMiddleware,getNearestDeadlineComplete)

//My task:
router.route("/get-all-task-of-user").get(AuthMiddleware,getAllTaskOfUser)

//Task Group:
router.route("/get-all-task-of-group").get(AuthMiddleware,getAllTaskOfGroup)

module.exports = router;