import { Product } from "../../../types.js";

export interface CreateCartInput {
    userId: string,
    products: Product[];
}

export interface UpdateCartInput extends Partial<CreateCartInput> {}
