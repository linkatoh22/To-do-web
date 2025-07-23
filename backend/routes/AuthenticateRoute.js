const express = require("express")
const router = express.Router();
const {logIn,signUp} = require("../controllers/authenticateController")
const {sendEmailVerify,verifyOTP,reSendOTP} = require("../controllers/emailController");
const { handleAccessToken } = require("../controllers/tokenControllers");
router.post("/log-in",logIn);
router.post("/sign-up",signUp);

router.get("/send-email-verify",sendEmailVerify);
router.post("/verify-otp",verifyOTP);
router.post("/resend-otp",reSendOTP);
router.get("/handle-access-token",handleAccessToken);



module.exports = router;