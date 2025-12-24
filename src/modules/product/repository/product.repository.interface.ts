// repository/product.repository.interface.ts
import { Product } from "../model/product.model.js";
import { CreateProductInput, UpdateProductInput } from "../model/productInput.model.js";

export interface ProductRepository {
  getAll: () => Promise<Product[]>;
  getById: (productId: string) => Promise<Product | null>;
  create: (product: CreateProductInput) => Promise<Product>;
  update: (productId: string, updates: UpdateProductInput) => Promise<Product | null>;
  delete: (productId: string) => Promise<Product | null>;
}