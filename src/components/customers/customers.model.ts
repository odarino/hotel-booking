import { dbContext } from "config/database-context";
import { NextFunction } from "express";
import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Customers = sequelize.define("customers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name cannot be empty",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "Must be email format eg. johndoe@domain.com",
        },
        isExistedEmail: (value: string, next: NextFunction) => {
          const self = this;

          dbContext.customers
            .findOne({ where: { email: value } })
            .then((customer: any) => {
              if (customer && self && (self as any).email !== customer.email) {
                return next("Email is existed");
              }
              return next();
            })
            .catch((err) => {
              return next(err);
            });
        },
      },
    },
    phone_number: {
      type: DataTypes.STRING({ length: 50 }),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: true,
    },
    post_code: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: true,
    },
  });

  return Customers;
};
