import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { extractToken,getEnvVariable } from "../utility/index";
import type { RestaurantPayload } from "../dto/index";


declare module "express-serve-static-core" {
    interface Request {
        user?: RestaurantPayload;
    }
}

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) {
            return res.jsonError("Missing authorization header", 403);
        }
        const token = extractToken(authorization);
        if(!token) {
            return res.jsonError("Invalid authorization header", 403);
        }

        const payload = jwt.verify(token, getEnvVariable("JWT_SECRET")) as RestaurantPayload;
        req.user = payload;

        next();
    } catch (error) {
        next(error);
    }
}
