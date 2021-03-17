'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBio.belongsTo(models.User, {
        foreignKey: 'uid'
      })
    }
  };

  UserBio.init({
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserBio',
    tableName: 'user_game_biodata'
  });
  return UserBio;
}
