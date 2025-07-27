const express = require('express')
const router = express.Router();
const passport = require("../configs/passport");
const jwt = require("jsonwebtoken")
const {generateAccessToken,generateRefreshToken} = require("../utils/generateToken")
const {googleCallback} = require("../controllers/googleController")

router.get('/google',
    passport.authenticate('google',{
        scope:['profile','email']
    })
);

router.get('/google/callback',passport.authenticate('google',{session:false}),googleCallback)

module.exports = router;