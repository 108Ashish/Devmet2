const { Router } =  require('express');
const authController = require( "../controllers/auth.js")

const router = Router();

router.post('/signUp', authController.register)
router.post('/signIn', authController.login)

module.exports = router;