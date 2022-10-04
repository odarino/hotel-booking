import { dbContext } from "config/database-context";
import { NextFunction } from "express";
import { DataTypes, Sequelize } from "sequelize";
import { RoomTypeArr } from "utils/constants";

export default (sequelize: Sequelize) => {
  const Rooms = sequelize.define("rooms", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    room_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Room number must be a number",
        },
        notNull: {
          msg: "Room number cannot be empty",
        },
        isUnique: (value: string, next: NextFunction) => {
          const self = this;

          dbContext.rooms
            .findOne({ where: { room_number: value } })
            .then((room: any) => {
              if (
                room &&
                self &&
                (self as any).room_number !== room.room_number
              ) {
                return next("Room number must be unique");
              }
              return next();
            })
            .catch((err) => {
              return next(err);
            });
        },
      },
    },
    room_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Room type cannot be empty",
        },
        validRoomType: (value: number, next: NextFunction) => {
          if (!RoomTypeArr.find((x) => x.value === value)) {
            return next("Invalid room type");
          }

          return next();
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumber: (value: number, next: NextFunction) => {
          if (isNaN(value)) {
            return next("Price must be a valid number");
          }

          if (!isNaN(value) && value < 0) {
            return next("Price must be a positive number");
          }

          return next();
        },
      },
    },
    max_guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumber: (value: number, next: NextFunction) => {
          if (isNaN(value)) {
            return next("Max guests must be a valid number");
          }

          if (!isNaN(value) && value < 0) {
            return next("Max guests must be a positive number");
          }

          return next();
        },
      },
    },
    title: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title type cannot be empty",
        },
      },
    },
    description: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: true,
    },
  });

  return Rooms;
};
