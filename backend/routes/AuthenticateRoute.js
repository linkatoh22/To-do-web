const express = require("express")
const router = express.Router();
const {AuthMiddleware} = require("../middlewares/authMiddleware")

const {logIn,signUp,changePassword} = require("../controllers/authenticateController")

const {sendEmailVerify,verifyOTP,reSendOTP,sendPassLinkEmail,changePasswordWithToken} = require("../controllers/emailController");

const { handleAccessToken } = require("../controllers/tokenControllers");



router.post("/log-in",logIn);
router.post("/sign-up",signUp);


router.get("/send-email-verify",sendEmailVerify);
router.post("/verify-otp",verifyOTP);
router.post("/resend-otp",reSendOTP);
router.get("/handle-access-token",handleAccessToken);


router.route("/change-password").put(AuthMiddleware,changePassword);

router.post("/forget-password/send-link",sendPassLinkEmail)
router.put("/forget-password/change-password/:token",changePasswordWithToken)


module.exports = router;