const express = require("express")
const router = express.Router();
const {AuthMiddleware} = require("../middlewares/authMiddleware")

const {createGroup,editGroup,deleteGroup,getGroupsByUser} = require("../controllers/GroupController")

router.route("/create-group").post(AuthMiddleware,createGroup)
router.route("/update-group").put(AuthMiddleware,editGroup)
router.route("/delete-group").delete(AuthMiddleware,deleteGroup)
router.route("/get-group").get(AuthMiddleware,getGroupsByUser)

module.exports = router;