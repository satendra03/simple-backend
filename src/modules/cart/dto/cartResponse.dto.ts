import { Product } from "../../../types.js";

export interface CartResponseDto {
    id: string;
    userId: string;
    products: Product[];
}