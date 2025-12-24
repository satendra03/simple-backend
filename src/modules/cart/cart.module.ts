import { FireStoreCartRepository } from "./repository/cart.repository.js";
import { FireStoreCartService } from "./service/cart.service.js";
import { CartController } from "./controller/cart.controller.js";

const cartRepository = new FireStoreCartRepository();
const cartService = new FireStoreCartService(cartRepository);
const cartController = new CartController(cartService);

export { cartController };
