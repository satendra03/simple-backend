import { Cart } from "../model/cart.model.js";
import { CreateCartInput, UpdateCartInput } from "../model/cartInput.model.js";

export interface CartRepositoryInterface {
    getAll: () => Promise<Cart[]>
    getById: (cardId: string) => Promise<Cart | null>
    create: (cartInput: CreateCartInput) => Promise<Cart>
    update: (cartId: string, updates: UpdateCartInput) => Promise<Cart | null>
    delete: (cartId: string) => Promise<Cart | null>
}