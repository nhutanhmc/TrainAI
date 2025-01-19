import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.SQL_SERVER_DATABASE,
  process.env.SQL_SERVER_USER,
  process.env.SQL_SERVER_PASSWORD,
  {
    host: process.env.SQL_SERVER_SERVER,
    dialect: "mssql",
    port: parseInt(process.env.SQL_SERVER_PORT) || 1433,
    logging: false, // Không in log SQL
    dialectOptions: {
      trustServerCertificate: true, // Yêu cầu nếu dùng localhost
    },
  }
);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to SQL Server successfully!");

    // Đồng bộ schema (update nếu bảng tồn tại, tạo mới nếu chưa)
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully!");
  } catch (error) {
    console.error("SQL Connection Error:", error);
    throw error;
  }
}

export default sequelize;
