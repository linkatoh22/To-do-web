const express = require("express")
const router = express.Router();
const {AuthMiddleware} = require("../middlewares/authMiddleware")

const {createGroup,editGroup,deleteGroup} = require("../controllers/GroupController")

router.route("/create-group").post(AuthMiddleware,createGroup)
router.route("/update-group").put(AuthMiddleware,editGroup)
router.route("/delete-group").delete(AuthMiddleware,deleteGroup)

module.exports = router;