var express = require('express');
var router = express.Router();

var upload = require('../../config/multer')
var userController = require('../controller/userController.js')
var testUserController = require('../controller/testUserController');

router.post('/signIn', userController.postUserSignIn);
router.post('/signUp', upload.array('image', 1), userController.postUserSignUp);

router.post('/testlogin', testUserController.login);
router.post('/testsignup', testUserController.signup);

module.exports = router;
