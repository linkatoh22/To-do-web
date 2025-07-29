const express = require('express')
const router = express.Router();
const passport = require("../configs/passport");
const jwt = require("jsonwebtoken")
const {googleCallback} = require("../controllers/googleController")

router.get('/google',
    passport.authenticate('google',{
        scope:['profile','email']
    })
);

router.get('/google/callback',
    passport.authenticate('google',{session:false,failureRedirect:'/log-in'}),
    googleCallback)

module.exports = router;