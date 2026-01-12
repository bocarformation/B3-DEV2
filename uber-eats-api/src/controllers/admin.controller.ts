import type { NextFunction, Request, Response } from "express";
import type { CreateRestaurantInputs } from "../dto/index";
import { prisma } from "../prisma/client";
import { generateSalt, hashPassword } from "../utility/index";
import { sanitizeRestaurant } from "../utility/index";

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

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(body.password, salt);

        const restaurant = await prisma.restaurant.create({
            data:  {...body, salt: salt, password: hashedPassword}
        })
        res.status(201).json(sanitizeRestaurant(restaurant));
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
        const restaurants =  await prisma.restaurant.findMany();

        if(!restaurants){
            return res.status(404).json({message: "No restaurant found"})
        }

        res.status(200).json(restaurants.map(sanitizeRestaurant));
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
        const {id} = req.params;
        const restaurant = await prisma.restaurant.findUnique({
            where: {id: id}
        });
        
        if(!restaurant){
            return res.status(404).json({message: "Restaurant not found" });
        }
        res.status(200).json(sanitizeRestaurant(restaurant));
    } catch (error) {
        next(error);
    }
};


