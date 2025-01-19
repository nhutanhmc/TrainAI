import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RunningSchedule = sequelize.define(
  "RunningSchedule",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Cho phép NULL
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true, // Cho phép NULL
    },
    distance: {
      type: DataTypes.FLOAT, // Quãng đường chạy (km)
      allowNull: true, // Cho phép NULL
    },
    duration: {
      type: DataTypes.INTEGER, // Thời gian chạy (phút)
      allowNull: true, // Cho phép NULL
    },
    food: {
      type: DataTypes.STRING, // Gợi ý thực phẩm
      allowNull: true, // Cho phép NULL
    },
    dayNumber: {
      type: DataTypes.INTEGER, // Số thứ tự ngày trong lịch
      allowNull: true, // Cho phép NULL
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

export default RunningSchedule;
