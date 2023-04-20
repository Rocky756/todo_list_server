const Router = require('express');
const router = new Router();
const checkRole = require('../midlleware/checkRoleMiddleware');
const { getAllTasks, createTask, editTaskText, editTaskDoneStatus } = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', createTask);
router.patch('/text', checkRole('admin'), editTaskText);
router.patch('/isdone', checkRole('admin'), editTaskDoneStatus);

module.exports = router