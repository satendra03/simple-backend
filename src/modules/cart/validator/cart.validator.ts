import { Request, Response, NextFunction } from "express";
import { CreateCartDto } from "../dto/createCart.dto.js";
import { BadRequestError } from "@/shared/ApiError.js";
import { isString } from "@/utils/index.js";
import { UpdateCartDto } from "../dto/updateCart.dto.js";

export const validateCreateCart = (req: Request, res: Response, next: NextFunction) => {
    const cart = req.body as CreateCartDto;

    if (!cart) return next(new BadRequestError("Invalid input"));
    if (!cart.userId) return next(new BadRequestError("User ID is required"));
    if (!cart.products) return next(new BadRequestError("Products are required"));

    next();
}

export const validateCartId = (req: Request, res: Response, next: NextFunction) => {
  let { cartId } = req.params;

  cartId = cartId?.trim(); // No spaces
  if (!cartId || !isString(cartId)) return next(new BadRequestError("Invalid cart ID"));
  req.params.cartId = cartId; // Normalize cartId

  next();
};

export const validateUpdateCart = (req: Request, res: Response, next: NextFunction) => {
    const updates = req.body as UpdateCartDto;

    if (!updates) return next(new BadRequestError("Invalid input"));
    if (Object.keys(updates).length === 0) return next(new BadRequestError("At least one field is required to update"));

    next();
};
