const ApiError = require('../errors/ApiError');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateJwt = (id, name, role) => {
  return jwt.sign(
    {id, name, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}  

class adminController {
  async login(req, res, next) {
    const {name, password} = req.body;
    const user = await User.findOne({where: {name}});
    if (!user) {
        return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.name, user.role);
    return res.json({token});
  }
  
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name, req.user.role);
    return res.json({token});
  }
}

module.exports = new adminController()
