// All Routes

import { Application } from "express";
import productRouter from "./modules/product/product.route.js";
import userRouter from "./modules/user/user.route.js";
import cartRoute from "./modules/cart/cart.route.js";

const modules = [ 
    productRouter,
    userRouter,
    cartRoute
];

export const registerRoutes = (app: Application) => {
    modules.forEach((route) => {
        app.use(route.path, route.router);
    });
};