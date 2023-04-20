const { Task } = require('../models/models');
const ApiError = require('../errors/ApiError');
const sequelize = require('../db');

const getAllTasks = async (req, res, next) => {
  let { page, sortWord, sortDir } = req.query;
  page = page || 1;
  sortWord = sortWord || 'id';
  sortDir = sortDir || 'up';
  const limit = 3;
  const offset = (page - 1) * limit;

  let order;
  if (sortWord === 'id') {
    order = [
      [sortWord, sortDir === 'up' ? 'ASC' : 'DESC'],
    ];
  } else if (sortWord === 'isDone') {
    order = [
      [sortWord, sortDir === 'up' ? 'DESC' : 'ASC'],
      ['id', 'ASC']
    ];
  } else {
    order = [
      [sequelize.fn('lower', sequelize.col(sortWord)), sortDir === 'up' ? 'ASC' : 'DESC'],
      ['id', 'ASC']
    ];
  }

  const tasks = await Task.findAll({ order, limit, offset });
  const count = await Task.count();
  const numOfPages = Math.ceil(count / 3);
  return res.json({ count, numOfPages, tasks });
}

const createTask = async (req, res, next) => {
  const { name, email, text } = req.body;
  const task = await Task.create({ name, email, text });

  return res.json(task);
}

const editTaskText = async (req, res, next) => {
  const { id } = req.query;
  const { text, isEditByAdmin } = req.body;
  const [, [updatedTask]] = await Task.update({ text, isEditByAdmin }, { where: { id }, returning: true });
  const task = updatedTask.dataValues;
  console.log(task);
  return res.json(task);
} 

const editTaskDoneStatus = async (req, res, next) => {
  const { id } = req.query;
  const { isDone } = req.body;
  const rowsUpdated = await Task.update({ isDone }, { where: { id } });
  if (rowsUpdated[0] === 0) {
    return res.status(404).json({ message: 'Запись не найдена' });
  }
  const task = await Task.findOne({ where: { id } });
  return res.json(task);
} 

module.exports = { getAllTasks, createTask, editTaskText, editTaskDoneStatus }