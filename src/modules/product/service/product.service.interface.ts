//  Product Service Interface
import { Product } from "../model/product.model.js";
import { CreateProductInput, UpdateProductInput } from "../model/ProductInput.type.js";

export interface ProductService {
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(product: CreateProductInput): Promise<Product>;
    updateProduct(id: string, updates: UpdateProductInput): Promise<Product>;
    deleteProduct(id: string): Promise<boolean>;
}