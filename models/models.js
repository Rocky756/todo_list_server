const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING},
})

const Task = sequelize.define('task', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
  text: {type: DataTypes.STRING, allowNull: false},
  isEditByAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
  isDone: {type: DataTypes.BOOLEAN, defaultValue: false},
})

module.exports = { Task, User }