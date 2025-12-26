import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@/shared/ApiError.js";
import { CreateProductDto } from "../dto/createProduct.dto.js";
import { UpdateProductDto } from "../dto/updateProduct.dto.js";
import { isNumber, isString } from "@/utils/index.js";

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as CreateProductDto;

  if (!product) return next(new BadRequestError("Invalid input"));
  if (!product.name) return next(new BadRequestError("Product name is required"));
  if (!product.price || product.price < 0) return next(new BadRequestError("Product price must be a positive number"));
  if (!product.category) return next(new BadRequestError("Product category is required"));

  next();
};

export const validateProductId = (req: Request, res: Response, next: NextFunction) => {
  let { productId } = req.params;

  productId = productId?.trim(); // No spaces
  if (!productId || !isString(productId)) return next(new BadRequestError("Invalid product ID"));
  req.params.productId = productId; // Normalize productId

  next();
};

export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
  const updates = req.body as UpdateProductDto;

  if (!updates) return next(new BadRequestError("Invalid input"));
  if (Object.keys(updates).length === 0) return next(new BadRequestError("At least one field is required to update"));
  if (!isNumber(updates.price)) return next(new BadRequestError("Product price must be a number"));

  next();
};