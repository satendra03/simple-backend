// repository/product.repository.interface.ts
import { Product } from "../model/product.model.js";
import { CreateProductDto } from "../dto/CreateProduct.dto.js";

export interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(product: CreateProductDto): Promise<Product>;
  updateProduct(id: string, updates: Partial<CreateProductDto>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
}
