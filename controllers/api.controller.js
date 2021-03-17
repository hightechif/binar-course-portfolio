//  API Controller

const { v4: uuidv4 } = require('uuid')
const db = require('../db/models')

// const apiIndex = async (req, res) => {
//   res.status(200).json({
//     "message": "Welcome to Game API",
//     "/api/v1/": "API Index",
//     "/api/v1/register": "Register User",
//     "/api/v1/login": "User Login",
//     "/api/v1/whoami": "Show Current User",
//     "/api/v1/players": "Get All Players",
//     "/api/v1/players/create": "Create New Player",
//     "/api/v1/players/:id": "Get Player by ID",
//     "/api/v1/players/update/:id": "Update Player by ID",
//     "/api/v1/players/delete/:id": "Delete Player by ID"
//   })
// }

const createRoom = async (req, res, next) => {
  await db.Room.create({
    room_id: uuidv4(),
    name: req.body.name,
    player1_id: null, // PR
    player2_id: null  // PR
  }).then((room) => {
      res.json({room_id: room.room_id});
  }).catch((error) => next(error.message))
}

const getAllPlayers = async (req, res) => {
  const users = await db.User.findAll({
    include: [db.UserBio, db.UserHistory],
  })
  res.json({ users })
}

const getPlayerById = async (req, res) => {
  const user = await db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.UserBio, db.UserHistory],
  })
  res.json({ user })
}

const createPlayer = async (req, res) => {
  const user = req.body
  const uuid = uuidv4()
  await db.User.register(user, uuid, db)
    .then(() => {
      res.json({ status: 'Created' });
    })
    .catch((error) => next(error.message))
}

const updatePlayer = async (req, res) => {
  const user = await req.body

  await db.User.update(
    { email: user.email },
    {
      where: {
        id: req.params.id,
      },
    }
  )

  await db.UserBio.update(
    {
      firstname: user.firstname,
      lastname: user.lastname,
      city: user.city,
    },
    {
      where: {
        uid: req.params.id,
      },
    }
  )

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

  res.json({ status: 'Updated' })
}

const deletePlayer = async (req, res) => {
  await db.User.destroy({
    where: {
      id: req.params.id,
    },
  })

  res.json({ status: 'Deleted' })
}

module.exports = {
  createRoom,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
  updatePlayer,
}
