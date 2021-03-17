'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, {
        foreignKey: 'player1_id'
      })
    }
  };
  Room.init({
    room_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    player1_id: DataTypes.UUID,
    player2_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Room',
    tableName: "game_room"
  });
  return Room;
};