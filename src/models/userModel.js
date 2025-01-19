import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true, // Cho phép NULL
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true, // Cho phép NULL
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true, // Cho phép NULL
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

export default User;
