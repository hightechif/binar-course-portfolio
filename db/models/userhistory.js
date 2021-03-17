'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserHistory.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  };

  UserHistory.init({
    log_id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    winStatus: {
      type: DataTypes.STRING,
      defaultValue: "Not play yet",
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
      timestamps: false,
      modelName: 'UserHistory',
      tableName: 'user_game_history'
  });
  return UserHistory;
}
