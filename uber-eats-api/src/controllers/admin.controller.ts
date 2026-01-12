import type { NextFunction, Request, Response } from "express";
import type { CreateRestaurantInputs } from "../dto/index";
import { prisma } from "../prisma/client";

export const registerRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const body = req.body as CreateRestaurantInputs;
        const existingRestaurant = await prisma.restaurant.findUnique({
            where : {email: body.email}
        });

        if(existingRestaurant){
            return res.status(400).json({message: `Email ${body.email} already exist`});
        }
        const restaurant = await prisma.restaurant.create({
            data:  {...body, salt: "eghrjk"}
        })
        res.status(201).json(restaurant);
    } catch (error) {
        next(error);
    }
};

export const getRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
};

export const getRestaurantById = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
};