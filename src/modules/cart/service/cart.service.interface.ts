import { Cart } from "../model/cart.model.js";
import { CreateCartInput, UpdateCartInput } from "../model/cartInput.model.js";

export interface CartService {
    getAllCarts: () => Promise<Cart[]>
    getCartById: (cartId: string) => Promise<Cart>
    createCart: (cart: CreateCartInput) => Promise<Cart>
    updateCart: (cartId: string, updates: UpdateCartInput) => Promise<Cart>
    deleteCart: (cartId: string) => Promise<Cart>
}