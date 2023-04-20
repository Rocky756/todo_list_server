require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require("cors");
const router = require('./routes/index');
const models = require('./models/models')
const errorMidlleware = require('./midlleware/ErrorMiddleware');
const bcrypt = require('bcrypt');
const { User } = require('./models/models');

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', router);

app.use(errorMidlleware);

const start = async () => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 5);
      const [user, created] = await User.findOrCreate({
        where: { name: process.env.ADMIN_NAME },
        defaults: {
          name: process.env.ADMIN_NAME,
          password: hashedPassword, // Использование захешированного пароля
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
      console.log(e)
  }
}

start();