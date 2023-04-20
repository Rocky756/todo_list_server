const Router = require('express');
const router = new Router();
const taskRouter = require('./taskRouter');
const adminRouter = require('./adminRouter');

router.use('/task', taskRouter);
router.use('/user', adminRouter);

module.exports = router