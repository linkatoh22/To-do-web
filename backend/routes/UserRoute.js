const {AuthMiddleware} = require("../middlewares/authMiddleware") 
const {editProfile,getUser,changePassword} = require("../controllers/UserController")
const express = require("express")
const router = express.Router();
const upload = require("../middlewares/upload")


router.route("/edit-profile").put(AuthMiddleware,upload.single("avatar"),editProfile);
router.route("/get-profile").get(AuthMiddleware,getUser);
router.route("/change-password").put(AuthMiddleware,changePassword);

module.exports = router