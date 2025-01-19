import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,// Đảm bảo giá trị không trùng lặp nếu có
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true, // Cho phép NULL
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

export default Product;
