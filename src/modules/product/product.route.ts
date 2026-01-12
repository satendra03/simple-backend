// Product Route
import { Router } from "express";
import { productController } from "./product.module.js";
import { validateCreateProduct, validateProductId, validateUpdateProduct } from "./validator/product.validator.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { isAdmin } from "@/middlewares/admin.middleware.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts); // Get All Products
productRouter.get("/:productId", validateProductId, productController.getProductById); // Get Product By Id
productRouter.post("/", authMiddleware, isAdmin, validateCreateProduct, productController.createProduct); // Create Product
productRouter.patch("/:productId", authMiddleware, isAdmin, validateProductId, validateUpdateProduct, productController.updateProduct); // Update Product
productRouter.delete("/:productId", authMiddleware, isAdmin, validateProductId, productController.deleteProduct); // Delete Product

export default {
    path: "/products",
    router: productRouter
};