## Code Challenge | Binar Academy

### Description

This is a landing page with paper rock scissors game and CRUD Dashboard using NodeJS, Express, PostgreSQL and Sequelize. This app also provide RESTful API with JWT Authentication. This repository created to complete the Code Challenge of Chapter 7 from Binar Academy. There are 4 tables on the database after installation: `user_game`, `user_game_biodata`, `user_game_history`, `SequelizeMeta` (stores postgres setting).

![Admin Login](https://github.com/ridhanf/FSW5-RFadhil-06-Challenge/blob/feature/dashboard/preview/admin-login.png?raw=true)
![Admin Dashboard](https://github.com/ridhanf/FSW5-RFadhil-06-Challenge/blob/feature/dashboard/preview/admin-dashboard.png?raw=true)
![Landing Page](https://github.com/ridhanf/FSW5-RFadhil-06-Challenge/blob/feature/dashboard/preview/landing-page.png?raw=true)
![Game](https://github.com/ridhanf/FSW5-RFadhil-06-Challenge/blob/feature/dashboard/preview/game.png?raw=true)

Landing Page Mobile        |  Game Mobile
:-------------------------:|:-------------------------:
![Landing Page Mobile](https://github.com/ridhanf/FSW5-RFadhil-06-Challenge/blob/feature/dashboard/preview/landing-page-mobile.png?raw=true)  |  ![Game Mobile](https://github.com/ridhanf/FSW5-RFadhil-06-Challenge/blob/feature/dashboard/preview/game-mobile.png?raw=true)

Routes:

```
LANDING PAGE
GET    /                              """Landing Page"""

GAME
GET    /game                          """Game Page"""

DASHBOARD
GET    /dashboard                     """Admin Login"""
POST   /login                         """Simple login authentication"""
GET    /dashboard/users               """Admin Dashboard"""
GET    /dashboard/create              """Create Player Form"""
POST   /dashboard/users/create        """Create New Use"
GET    /dashboard/users/:id           """Player Detail Info"""
GET    /dashboard/users/update/:id    """Update player Form"""
PUT    /dashboard/users/update/:id    """Update User Info"""
DELETE /dashboard/users/:id           """Delete User"""

RESTful API
GET    /docs                          """API Documentation""
POST   /api/v1/register               """Register User"""
POST   /api/v1/login                  """User Login"""
GET    /api/v1/whoami                 """Show Current User"""
POST   /api/v1/create-room            """Create a Game Room"""
GET    /api/v1/players                """Get All Players"""
POST   /api/v1/players/create         """Create New Player"""
GET    /api/v1/players/:id            """Get Player by ID"""
PUT    /api/v1/players/update/:id     """Update Player by ID"""
DELETE /api/v1/players/delete/:id     """Delete Player by ID"""
```


### Instalation

**1. Clone the source code**

```
$ git clone git@github.com:ridhanf/FSW5-RFadhil-07-Challenge.git
$ cd FSW5-RFadhil-07-Challenge
```

**2. Install Dependencies**

Make sure you have [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed. Project dependencies listed in `package.json`.

```
$ npm install
```

**3. Run sequelize**

Generate database

```
$ sequelize db:create
```

Run migration and seeders

```
$ sequelize db:migrate
$ sequelize db:seed:all
```

**4. Run the server**

Run server with:

```
$ npm run start
```

or

```
$ npm run dev
```

&nbsp;

Server listening in port 3000 (open http://localhost:3000)

That's all. Thank you.


Sincerely,

&nbsp;

Ridhan Fadhilah