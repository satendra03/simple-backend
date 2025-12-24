import { Cart } from "../model/cart.model.js";
import { CartResponseDto } from "../dto/cartResponse.dto.js";
import { CreateCartDto } from "../dto/createCart.dto.js";
import { UpdateCartDto } from "../dto/updateCart.dto.js";
import { CreateCartInput, UpdateCartInput } from "../model/cartInput.model.js";

export class CartMapper {
    static toResponseDto(cart: Cart): CartResponseDto {
        return {
            id: cart.id,
            userId: cart.userId,
            products: cart.products,
        };
    }
    static toResponseDtoList(carts: Cart[]): CartResponseDto[] {
        return carts.map(cart => this.toResponseDto(cart));
    }
    static toCreateInput(cart: CreateCartDto): CreateCartInput {
        return {
            userId: cart.userId,
            products: cart.products
        };
    }
    static toUpdateInput(cart: UpdateCartDto): UpdateCartInput {
        const cartInput: UpdateCartInput = {};

        if (cart.userId !== undefined) cartInput.userId = cart.userId;
        if (cart.products !== undefined) cartInput.products = cart.products;

        return cartInput;
    }
}