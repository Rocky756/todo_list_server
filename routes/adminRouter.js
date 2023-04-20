const Router = require('express');
const router = new Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../midlleware/AuthMiddleware');

router.post('/login', adminController.login)
router.get('/auth', authMiddleware, adminController.check)



module.exports = router