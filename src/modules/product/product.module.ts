import { FireStoreProductRepository } from "./repository/product.repository.js";
import { FireStoreProductService } from "./service/product.service.js";
import { ProductController } from "./controller/product.controller.js";

const productRepository = new FireStoreProductRepository();
const productService = new FireStoreProductService(productRepository);
const productController = new ProductController(productService);

export { productController };