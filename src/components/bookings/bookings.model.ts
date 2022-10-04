import { sequelizeInstance } from "config/database-context";
import { DataTypes, Sequelize } from "sequelize";
import Customers from "../customers/customers.model";
import Rooms from "../rooms/rooms.model";

export default (sequelize: Sequelize) => {
  const Bookings = sequelize.define("bookings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    checked_in_origin: {
      // Date that user is gonna check in in app
      type: DataTypes.DATE,
      allowNull: false,
    },
    checked_out_origin: {
      // Date that user is gonna check out in app
      type: DataTypes.DATE,
      allowNull: false,
    },
    checked_in_actual: {
      // Date that user is actual in hotel
      type: DataTypes.DATE,
      allowNull: true,
    },
    checked_out_actual: {
      // Date that user is actual out hotel
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Bookings.belongsTo(Customers(sequelizeInstance), {
    foreignKey: "customer_id",
  });
  Bookings.belongsTo(Rooms(sequelizeInstance), { foreignKey: "room_id" });

  return Bookings;
};
