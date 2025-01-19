import { askFineTunedModel } from "../config/openai.js";
import Product from "../models/productModel.js";

export async function processUserMessage(message) {
  const modelResponse = await askFineTunedModel(message);
  let productName = "";

  if (/laptop/i.test(message)) {
    productName = "Laptop";
  } else if (/smartphone/i.test(message)) {
    productName = "Smartphone";
  }

  let finalAnswer = modelResponse;

  if (productName) {
    const product = await Product.findOne({ where: { name: productName } });
    if (product) {
      finalAnswer += `\nGiá của ${productName} là: ${product.price}`;
    } else {
      finalAnswer += `\nKhông tìm thấy sản phẩm ${productName}`;
    }
  }

  return finalAnswer;
}
