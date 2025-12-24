import { Product } from "../../../types.js";

export interface CreateCartDto {
    userId: string;
    products: Product[];
}