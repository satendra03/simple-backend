// repository/product.repository.interface.ts
import { Product } from "../model/product.model.js";
import { CreateProductInput, UpdateProductInput } from "../model/ProductInput.type.js";

export interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductById(productId: string): Promise<Product | null>;
  createProduct(product: CreateProductInput): Promise<Product>;
  updateProduct(productId: string, updates: UpdateProductInput): Promise<Product>;
  deleteProduct(productId: string): Promise<Product | null>;
}
