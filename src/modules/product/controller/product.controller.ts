// ProductController

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../../shared/ApiResponse.js";
import { ProductService } from "../service/product.service.interface.js";
import { ProductMapper } from "../mapper/product.mapper.js";
import { UpdateProductInput } from "../model/productInput.model.js";
import { UpdateProductDto } from "../dto/updateProduct.dto.js";
import { CreateProductDto } from "../dto/createProduct.dto.js";

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
        } catch (error) {
            next(error);
        }
    };
    getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;
            const product = await this.productService.getProductById(productId);
            const response = ProductMapper.toResponseDto(product);

            res.status(200).json(ApiResponse.success({
                message: "Product fetched successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    };
    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body as CreateProductDto;
            const createProductInput = ProductMapper.toCreateInput(input);
            const product = await this.productService.createProduct(createProductInput);
            const response = ProductMapper.toResponseDto(product);

            res.status(201).json(ApiResponse.success({
                message: "Product created successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    };
    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;
            const updates = req.body as UpdateProductDto;

            const updatedProductInput = ProductMapper.toUpdateInput(updates);
            const product = await this.productService.updateProduct(productId, updatedProductInput);
            const response = ProductMapper.toResponseDto(product);

            res.status(200).json(ApiResponse.success({
                message: "Product updated successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    };
    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;
            const product = await this.productService.deleteProduct(productId);
            const response = ProductMapper.toResponseDto(product);
            
            return res.status(200).json(ApiResponse.success({
                message: "Product deleted successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    };
}