//  Product Service Interface
import { Product } from "../model/product.model.js";
import { CreateProductInput, UpdateProductInput } from "../model/productInput.model.js";

export interface ProductService {
    getAllProducts: () => Promise<Product[]>;
    getProductById: (productId: string) => Promise<Product>;
    createProduct: (product: CreateProductInput) => Promise<Product>;
    updateProduct: (productId: string, updates: UpdateProductInput) => Promise<Product>;
    deleteProduct: (productId: string) => Promise<Product>;
}