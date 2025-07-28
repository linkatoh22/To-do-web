const express = require("express")
const router = express.Router();
const {AuthMiddleware} = require("../middlewares/authMiddleware")

const {createTask,updateTask,deleteTask} = require("../controllers/TaskController")

router.route("/create-task").post(AuthMiddleware,createTask)
router.route("/update-task").put(AuthMiddleware,updateTask)
router.route("/delete-task").delete(AuthMiddleware,deleteTask)

module.exports = router;