// Import Module
const express = require('express');
const db = require('../db/models');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

const dashboardRouter = express.Router({caseSensitive: false});

// main dashboard route
dashboardRouter.get('/', (req, res) => {
  res.status(200).render('dashboard/dashboard');
})

// Login Handler
const loginHandler = async (req, res) => {
  const body = req.body
  if ((req, body.username === 'admin' && req.body.password === 'admin')) {
    res.redirect('/dashboard/users');
  } else {
    res.redirect('/dashboard');
  }
}

dashboardRouter.post('/login', loginHandler);

// READ databse using GET /users
dashboardRouter.get('/users', async (req, res) => {
  const users = await db.User.findAll({
    include: [db.UserBio, db.UserHistory],
  })
  res.render('dashboard/allUsers', { users })
})

// GET create page
dashboardRouter.get('/create', async (req, res) => {
  res.render('dashboard/create');
})

// CREATE database using POST /users/create
dashboardRouter.post('/users/create', async (req, res) => {
  console.log('MAAAASUUUUK')
  const user = req.body;
  const uuid = uuidv4();
  await db.User.create({
    id: uuid,
    username: user.username,
    email: user.email,
    password: user.password,
    UserBio: {
      uid: uuid
    },
    UserHistories: [
      {
        log_id: uuidv4(),
        user_id: uuid
      }
    ]
  },
  {
    include: [db.UserBio, db.UserHistory]
  })
  res.status(201).render('dashboard/create-success');
})

// READ database using GET /users/:id
dashboardRouter.get('/users/:id', async (req, res) => {
  await db.User.findByPk(req.params.id, {
    include: [db.UserBio, db.UserHistory],
  })
  .then(user => {
    if(user) {
      res.status(200).render('dashboard/user-detail', {user});
    } else {
      res.status(404).json({
        message: "ID User is Not Found"
      })  
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

// UPDATE databse using PUT /users/:id

// DELETE database using DELETE /users/:id

module.exports = dashboardRouter;
