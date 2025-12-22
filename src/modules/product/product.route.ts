// Product Route
import { Router } from "express";
import { productController } from "./product.module.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts); // Get All Products
productRouter.get("/:id", productController.getProductById); // Get Product By Id
productRouter.post("/", productController.createProduct); // Create Product
productRouter.patch("/:id", productController.updateProduct); // Update Product
productRouter.delete("/:id", productController.deleteProduct); // Delete Product

export default productRouter;