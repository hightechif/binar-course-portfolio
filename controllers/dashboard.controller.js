// Dashboard Controller

const db = require('../db/models');
const { v4: uuidv4 } = require('uuid');

const showDashboardPage = (req, res) => {
  res.status(200).render('dashboard/dashboard');
}

const loginHandler = async (req, res, next) => {
  await db.User.authenticate(req.body)
    .then(user => {
      if (user.username === "admin") {
        console.log("ADMIN LOGIN RESOLVED");
        dataUser = {
          id: user.id,
          username: user.username,
          token: user.generateToken()
        }
        res.status(200).redirect('/dashboard/users');
      } else {
        res.redirect('/dashboard');
        next("USER UNAUTHORIZED");
      }
    })
    .catch(error => {
      console.log(error);
      res.redirect('/dashboard');
    })
}

const showUsersData = async (req, res) => {
  const users = await db.User.findAll({
    where: {
        isAdmin: false
      },
    include: [db.UserBio, db.UserHistory]
  })
  res.status(200).render('dashboard/allUsers', { users })
}

const showCreatePage = (req, res) => {
  res.status(200).render('dashboard/create');
}

const createNewUser = async (req, res, next) => {
  const user = req.body;
  const uuid = uuidv4();
  await db.User.register(user, uuid, db)
    .then(() => {
      res.status(201).redirect('/dashboard/users');
    })
    .catch((error) => next(error.message))
}

const showSingleUserData = async (req, res) => {
  await db.User.findByPk(req.params.id, {
    include: [db.UserBio, db.UserHistory]
  }).then(user => {
    if(user) {
      res.status(200).render('dashboard/userDetail', {user});
    }
  })
}

const showUpdatePage = async (req, res) => {
  await db.User.findByPk(req.params.id, {
    include: [db.UserBio, db.UserHistory]
  }).then(user => {
    if(user) {
      res.status(200).render('dashboard/update', {user});
    }
  }) 
}

const updateUser = async (req, res) => {
  const user = req.body;

  await db.User.update({ email: user.email }, {
    where:{
      id:req.params.id
    }
  })

  await db.UserBio.update({
    firstname:user.firstname,
    lastname:user.lastname,
    city: user.city
  },{
    where: {
      uid: req.params.id
    }
  })

  await db.UserHistory.update(
    {
      winStatus: user.winStatus,
      score: user.score,
    },
    {
      where: {
        user_id: req.params.id,
      },
    }
  )
  
  res.redirect(`/dashboard/users/${req.params.id}`)
}

const deleteUser = async (req, res) => {
  await db.User.destroy({
    where:{
      id:req.params.id
    },
    include: [db.UserBio, db.UserHistory]
  }).then(() => {
    res.status(201).redirect('/dashboard/users')
  }).catch(err => {
    res.status(400).json(`Can't delete article - ${err.message}`)
  })
}

module.exports = {
  showDashboardPage,
  loginHandler,
  showUsersData,
  showCreatePage,
  createNewUser,
  showSingleUserData,
  showUpdatePage,
  updateUser,
  deleteUser
}
