const express = require("express")
const router = express.Router();
const {AuthMiddleware} = require("../middlewares/authMiddleware")
const upload = require("../middlewares/upload")
const {createGroup,editGroup,deleteGroup,getGroupsByUser,getGroupDetail} = require("../controllers/GroupController")

router.route("/create-group").post(AuthMiddleware,upload.single("Pic"),createGroup)
router.route("/update-group/:groupId").put(AuthMiddleware,upload.single("Pic"),editGroup)

router.route("/delete-group/:groupId").delete(AuthMiddleware,deleteGroup)
router.route("/get-group").get(AuthMiddleware,getGroupsByUser)
router.route("/get-detail-group/:groupId").get(AuthMiddleware,getGroupDetail)

module.exports = router;