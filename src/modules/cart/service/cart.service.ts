import { CartService } from "./cart.service.interface.js";
import { FireStoreCartRepository } from "../repository/cart.repository.js";
import { Cart } from "../model/cart.model.js";
import { NotFoundError } from "@/shared/ApiError.js";
import { CreateCartInput, UpdateCartInput } from "../model/cartInput.model.js";

export class FireStoreCartService implements CartService {
    constructor(private repository: FireStoreCartRepository) {}

    getAllCarts = async (): Promise<Cart[]> => {
        const carts = await this.repository.getAll();
        // if(carts.length === 0) throw new NotFoundError("No carts found");
        return carts;
    }
    getCartById = async (cartId: string): Promise<Cart> => {
        const cart = await this.repository.getById(cartId);
        if (!cart) throw new NotFoundError("Cart not found");
        return cart;
    }
    createCart = async (cart: CreateCartInput): Promise<Cart> => {
        return await this.repository.create(cart);
    }
    updateCart = async (cartId: string, updates: UpdateCartInput): Promise<Cart> => {
        const cart = await this.repository.update(cartId, updates);
        if (!cart) throw new NotFoundError("Cart not found");
        return cart;
    }
    deleteCart = async (cartId: string): Promise<Cart> => {
        const cart = await this.repository.delete(cartId);
        if (!cart) throw new NotFoundError("Cart not found");
        return cart;
    }
}