import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import customers from "../components/customers/customers.model";
import rooms from "../components/rooms/rooms.model";

dotenv.config({ path: `.env` });

const connString = `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`;

const sequelizeInstance = new Sequelize(connString, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const dbContext = {
  rooms: rooms(sequelizeInstance),
  customers: customers(sequelizeInstance),
};

export { Sequelize, sequelizeInstance, dbContext };
