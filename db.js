import sql from "mssql";

// Cấu hình
const config = {
  user: process.env.SQL_SERVER_USER,
  password: process.env.SQL_SERVER_PASSWORD,
  database: process.env.SQL_SERVER_DATABASE,
  server: process.env.SQL_SERVER_SERVER,
  port: parseInt(process.env.SQL_SERVER_PORT) || 1433,
  options: {
    trustServerCertificate: true, // Nếu dev local thường cần true
  },
};

let pool;

export async function getConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log("Connected to SQL Server successfully!");
    }
    return pool;
  } catch (error) {
    console.error("SQL Connection Error: ", error);
    throw error;
  }
}

export async function getPriceByProductName(productName) {
    const pool = await getConnection();
    
    // Khởi tạo request
    const request = pool.request();
    
    // Gán tham số cho truy vấn
    request.input("name", sql.VarChar, productName);
  
    // In ra câu truy vấn và tham số
    console.log("Đang thực thi truy vấn:");
    console.log("SELECT price FROM Products WHERE name = @name");
    console.log("Tham số: { name =", productName, "}");
  
    // Thực thi truy vấn
    const result = await request.query("SELECT price FROM Products WHERE name = @name");
  
    if (result.recordset.length > 0) {
      return result.recordset[0].price;
    }
    return null;
  }
  
  export async function getUserDataById(userId) {
    const pool = await getConnection();
    
    // In ra câu truy vấn
    console.log("Đang thực thi truy vấn:");
    console.log("SELECT name, heart_rate, age FROM userData WHERE id = @id");
    console.log("Tham số: { id =", userId, "}");
  
    // Truy vấn SQL
    const result = await pool
      .request()
      .input("id", sql.Int, userId)
      .query("SELECT name, heart_rate, age FROM userData WHERE id = @id");
    
    if (result.recordset.length > 0) {
      return result.recordset[0];
    }
    return null;
  }
  