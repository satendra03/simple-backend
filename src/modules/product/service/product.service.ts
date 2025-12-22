// Product Service

import { ProductService } from "./product.service.interface.js";
import { Product } from "../model/product.model.js";
import { FireStoreProductRepository } from "../repository/product.repository.js";
import { NotFoundError } from "../../../shared/ApiError.js";
import { CreateProductInput, UpdateProductInput } from "../model/ProductInput.type.js";

export class FireStoreProductService implements ProductService {
    constructor(private productRepository: FireStoreProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }
    async getProductById(productId: string): Promise<Product> {
        const product = await this.productRepository.getProductById(productId);
        if (!product) throw new NotFoundError("Product not found");
        return product;
    }
    async createProduct(product: CreateProductInput): Promise<Product> {
        return await this.productRepository.createProduct(product);
    }
    async updateProduct(productId: string, updates: UpdateProductInput): Promise<Product> {
        const product = await this.productRepository.getProductById(productId);
        if (!product) throw new NotFoundError("Product not found");
        return await this.productRepository.updateProduct(productId, updates);
    }
    async deleteProduct(productId: string): Promise<Product> {
        const product = await this.productRepository.deleteProduct(productId);
        if (!product) throw new NotFoundError("Product not found");
        return product;
    }
}
