// All Routes

import { Application } from "express";
import productRouter from "./modules/product/index.js";
import userRouter from "./modules/user/index.js";

const modules = [ 
    productRouter,
    userRouter
];

export const registerRoutes = (app: Application) => {
    modules.forEach((route) => {
        app.use(route.path, route.router);
    });
};