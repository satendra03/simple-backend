// Product Service

import { ProductService } from "./product.service.interface.js";
import { Product } from "../model/product.model.js";
import { NotFoundError } from "../../../shared/ApiError.js";
import { CreateProductInput, UpdateProductInput } from "../model/productInput.model.js";
import { ProductRepository } from "../repository/product.repository.interface.js";

export class FireStoreProductService implements ProductService {
    constructor(private productRepository: ProductRepository) {}

    getAllProducts = async (): Promise<Product[]> => {
        const products = await this.productRepository.getAll();
        // if(products.length === 0) throw new NotFoundError("No products found");
        return products;
    }
    getProductById = async (productId: string): Promise<Product> => {
        const product = await this.productRepository.getById(productId);
        if (!product) throw new NotFoundError("Product not found");
        return product;
    }
    createProduct = async (product: CreateProductInput): Promise<Product> => {
        return await this.productRepository.create(product);
    }
    updateProduct = async (productId: string, updates: UpdateProductInput): Promise<Product> => {
        const product = await this.productRepository.update(productId, updates);
        if (!product) throw new NotFoundError("Product not found");
        return product;
    }
    deleteProduct = async (productId: string): Promise<Product> => {
        const product = await this.productRepository.delete(productId);
        if (!product) throw new NotFoundError("Product not found");
        return product;
    }
}
