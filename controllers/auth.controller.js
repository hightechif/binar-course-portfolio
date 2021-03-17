// const passport = require('passport');
const db = require('../db/models');
const { v4: uuidv4 } = require('uuid');

const register = (req, res, next) => {
  const uuid = uuidv4();
  db.User.register(req.body, uuid, db)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => next(error.message))
};

const login =  (req, res, next) => {
  db.User.authenticate(req.body)
    .then(user => {
      dataUser = {
        id: user.id,
        username: user.username,
        token: user.generateToken()
      }
      res.status(200).json(dataUser)
    })
    .catch(error => {
      return next(error.message)
    })
}

const whoami = (req, res) => {
  /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
  console.log(req);
  res.status(200).json(req.user);
  // res.render('profile', req.user.dataValues)
}

module.exports = {
  register,
  login,
  whoami
};
