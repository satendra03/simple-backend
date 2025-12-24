import { NextFunction, Request, Response } from "express";
import { CartService } from "../service/cart.service.interface.js";
import { ApiResponse } from "../../../shared/ApiResponse.js";
import { CartMapper } from "../mapper/cart.mapper.js";
import { CreateCartDto } from "../dto/createCart.dto.js";
import { UpdateCartDto } from "../dto/updateCart.dto.js";

export class CartController {
    constructor(private cartService: CartService) {}
    getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carts = await this.cartService.getAllCarts();
            const response = CartMapper.toResponseDtoList(carts);

            return res.status(200).json(ApiResponse.success({
                message: "Carts fetched successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    getCartById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartId = req.params.cartId;
            const cart = await this.cartService.getCartById(cartId);
            const response = CartMapper.toResponseDto(cart);

            return res.status(200).json(ApiResponse.success({
                message: "Cart fetched successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    createCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body as CreateCartDto;
            const createCartInput = CartMapper.toCreateInput(input);
            const cart = await this.cartService.createCart(createCartInput);
            const response = CartMapper.toResponseDto(cart);

            return res.status(201).json(ApiResponse.success({
                message: "Cart created successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    updateCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartId = req.params.cartId;
            const updates = req.body as UpdateCartDto;

            const updatedCartInput = CartMapper.toUpdateInput(updates);
            const cart = await this.cartService.updateCart(cartId, updatedCartInput);
            const response = CartMapper.toResponseDto(cart);

            return res.status(200).json(ApiResponse.success({
                message: "Cart updated successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    deleteCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartId = req.params.cartId;
            const cart = await this.cartService.deleteCart(cartId);
            const response = CartMapper.toResponseDto(cart);

            return res.status(200).json(ApiResponse.success({
                message: "Cart deleted successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
}