import { Router } from "express";
import { validateCreateCart, validateCartId, validateUpdateCart } from "./validator/cart.validator.js";
import { cartController } from "./cart.module.js";

const cartRouter = Router();

cartRouter.get("/", cartController.getAllCarts);
cartRouter.get("/:cartId", validateCartId, cartController.getCartById);
cartRouter.post("/", validateCreateCart, cartController.createCart);
cartRouter.put("/:cartId", validateCartId, validateUpdateCart, cartController.updateCart);
cartRouter.delete("/:cartId", validateCartId, cartController.deleteCart);

export default {
    path: "/cart",
    router: cartRouter
};