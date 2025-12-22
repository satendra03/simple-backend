// All Routes

import { Application } from "express";
import productRouter from "./modules/product/index.js";

const modules = [ 
    productRouter
];

export const registerRoutes = (app: Application) => {
    modules.forEach((route) => {
        app.use(route.path, route.router);
    });
};