import "dotenv/config.js";  // Để .env load lên
import express from "express";
import { askFineTunedModel, generateHealthMessage  } from "./openai.js";
import { getPriceByProductName, getUserDataById  } from "./db.js";

const app = express();
app.use(express.json()); 

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message; 
    // userMessage ví dụ: "Laptop của bạn giá như thế nào"

    // 1) Gọi model fine-tuned để phân tích
    const modelResponse = await askFineTunedModel(userMessage);

    // => Ở đây, tuỳ logic. Ví dụ, modelResponse có thể cho chúng ta
    // thông tin "User muốn hỏi về Laptop".
    //
    // Tất nhiên, nếu model đã được huấn luyện “hiểu” userMessage
    // và trả về “Laptop”, ta parse chuỗi. Ở đây demo cứng một cách
    // tạm thời, ta coi userMessage có chứa từ "laptop" => ta set productName = "Laptop"

    let productName = "";
    if (/laptop/i.test(userMessage)) {
      productName = "Laptop";
    } else if (/smartphone/i.test(userMessage)) {
      productName = "Smartphone";
    } else if (/tablet/i.test(userMessage)) {
      productName = "Tablet";
    }
    // Nếu phức tạp hơn, bạn có thể parse modelResponse
    // hoặc custom logic, v.v.

    let finalAnswer = modelResponse;

    // 2) Nếu productName != "", ta truy vấn database
    if (productName) {
      const price = await getPriceByProductName(productName);
      if (price) {
        // Ghép thêm vào câu trả lời
        finalAnswer += `\nGiá của ${productName} là: ${price}`;
      } else {
        finalAnswer += `\nRất tiếc, hiện chưa tìm thấy sản phẩm ${productName} trong DB.`;
      }
    }

    // 3) Trả về cho client
    res.json({
      success: true,
      data: finalAnswer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      error: "Internal Server Error" 
    });
  }
});

app.post("/api/health", async (req, res) => {
    try {
      const { id, message } = req.body;
  
      // 1) Kiểm tra đầu vào
      if (!id || !message) {
        return res.status(400).json({ 
          success: false, 
          error: "Vui lòng cung cấp 'id' và 'message'!" 
        });
      }
  
      // 2) Truy vấn dữ liệu user dựa vào id
      const userData = await getUserDataById(id);
  
      if (!userData) {
        return res.status(404).json({ 
          success: false, 
          error: `Không tìm thấy người dùng với id: ${id}` 
        });
      }
  
      // 3) Gọi model AI để phân tích sức khỏe, truyền message từ API
      const aiResponse = await generateHealthMessage(userData, message);
  
      // 4) Trả kết quả về cho client
      res.json({
        success: true,
        user: userData,
        analysis: aiResponse
      });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
