// Product Service

import { ProductService } from "./product.service.interface.js";
import { Product } from "../model/product.model.js";
import { FireStoreProductRepository } from "../repository/product.repository.js";
import { CreateProductInput, UpdateProductInput } from "../model/ProductInput.type.js";

export class FireStoreProductService implements ProductService {
    constructor(private productRepository: FireStoreProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }
    async getProductById(id: string): Promise<Product | null> {
        return await this.productRepository.getProductById(id);
    }
    async createProduct(product: CreateProductInput): Promise<Product> {
        return await this.productRepository.createProduct(product);
    }
    async updateProduct(id: string, updates: UpdateProductInput): Promise<Product> {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return await this.productRepository.updateProduct(id, updates);
    }
    async deleteProduct(id: string): Promise<boolean> {
        return await this.productRepository.deleteProduct(id);
    }
}
