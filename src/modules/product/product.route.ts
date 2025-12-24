// Product Route
import { Router } from "express";
import { productController } from "./product.module.js";
import { validateCreateProduct, validateProductId, validateUpdateProduct } from "./validator/product.validator.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts); // Get All Products
productRouter.get("/:productId", validateProductId, productController.getProductById); // Get Product By Id
productRouter.post("/", validateCreateProduct, productController.createProduct); // Create Product
productRouter.patch("/:productId", validateProductId, validateUpdateProduct, productController.updateProduct); // Update Product
productRouter.delete("/:productId", validateProductId, productController.deleteProduct); // Delete Product

export default {
    path: "/product",
    router: productRouter
};