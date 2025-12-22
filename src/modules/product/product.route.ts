// Product Route
import { Router } from "express";
import { productController } from "./product.module.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts); // Get All Products
productRouter.get("/:productId", productController.getProductById); // Get Product By Id
productRouter.post("/", productController.createProduct); // Create Product
productRouter.patch("/:productId", productController.updateProduct); // Update Product
productRouter.delete("/:productId", productController.deleteProduct); // Delete Product

export default productRouter;