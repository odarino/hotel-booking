import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Rooms = sequelize.define("rooms", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    room_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Room number cannot be empty",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: true,
    },
  });

  return Rooms;
};
