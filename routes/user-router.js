'use strict';
const AuthController = require('../controllers/user-controller'),
    express = require('express'),
    router = express.Router(),
    ac = new AuthController();
router.get("/", ac.index);
router.get("/login", ac.logInGet);
router.post("/login", ac.logInPost);
router.get("/signin", ac.signInGet);
router.post("/signin", ac.signInPost);
router.get('/logout', ac.logOut);
module.exports = router;