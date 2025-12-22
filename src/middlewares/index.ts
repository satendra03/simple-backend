// Middlewares

import cors from "cors";
import express, { Application } from "express";
// import { errorHandler } from "./error.middleware.js";
// import { notFoundHandler } from "./notFound.middleware.js";

//  CORS, JSON, URL encoded
export const registerMiddlewares = (app:Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

// Not found and error handlers
export const registerErrorHandlers = (app:Application) => {
    // app.use(notFoundHandler);
    // app.use(errorHandler);
};