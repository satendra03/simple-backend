import { Product } from "../../../types.js";

export interface CartDb {
    userId: string,
    products: Product[],

    createdAt: Date,
    updatedAt: Date
}

export interface Cart extends CartDb {
    id: string;
}