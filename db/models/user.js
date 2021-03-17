'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserBio, {
        foreignKey: {
          name: 'uid',
          allowNull: false
        }
      })
      
      this.hasMany(models.UserHistory, {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      })

      this.hasOne(models.Room, {
        foreignKey: {
          name: 'player1_id'
        }
      })
    }

    static encrypt(password) {
      return bcrypt.hashSync(password, 10)
    }

    static register({username, email, password}, uuid, models) {
      const encryptedPassword = this.encrypt(password+'')
      return this.create({
        id: uuid,
        username,
        email,
        password: encryptedPassword,
        isAdmin: false,
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
        include: [models.UserBio, models.UserHistory]
      })
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username }})
        if (!user) {
          return Promise.reject("USER NOT FOUND!");
        }
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) {
          return Promise.reject("WRONG PASSWORD")
        }
        return Promise.resolve(user)
      } catch(err) {
        return Promise.reject(err.message)
      }
    }

    generateToken() {
      const payLoad = {
        id: this.id,
        username: this.username
      }

      const secretKey = 'strong-secret';

      const token = jwt.sign(payLoad, secretKey, { expiresIn: '24h' });
      return token;
    }
  };

  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user_game'
  });
  return User;
}
