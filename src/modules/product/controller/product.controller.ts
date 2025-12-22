// ProductController

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../../shared/ApiResponse.js";
import { ProductService } from "../service/product.service.interface.js";
import { ProductMapper } from "../mapper/product.mapper.js";
import { UpdateProductInput } from "../model/ProductInput.type.js";

export class ProductController {
    constructor(private productService: ProductService) {}

    getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getAllProducts();
            const response = ProductMapper.toResponseDtoList(products);

            res.status(200).json(ApiResponse.success({
                message: "Products fetched successfully",
                data: response
            }));
        } catch (err) {
            next(err);
        }
    };
    getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;
            const product = await this.productService.getProductById(productId);
            if (!product) {
                return res.status(404).json(ApiResponse.error("Product not found"));
            }
            const response = ProductMapper.toResponseDto(product);

            res.status(200).json(ApiResponse.success({
                message: "Product fetched successfully",
                data: response
            }));
        } catch (err) {
            next(err);
        }
    };
    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body;
            const createProductInput = ProductMapper.toCreateInput(input);
            const product = await this.productService.createProduct(createProductInput);
            const response = ProductMapper.toResponseDto(product);

            res.status(201).json(ApiResponse.success({
                message: "Product created successfully",
                data: response
            }));
        } catch (err) {
            next(err);
        }
    };
    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;
            const updates: UpdateProductInput = req.body;
            const product = await this.productService.updateProduct(productId, updates);
            const response = ProductMapper.toResponseDto(product);

            res.status(200).json(ApiResponse.success({
                message: "Product updated successfully",
                data: response
            }));
        } catch (err) {
            next(err);
        }
    };
    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;
            const deleted: boolean = await this.productService.deleteProduct(productId);
            if(!deleted) {
                return res.status(404).json(ApiResponse.error("Product not found"));
            }
            return res.status(200).json(ApiResponse.success({
                message: "Product deleted successfully",
            }));
        } catch (err) {
            next(err);
        }
    };
}