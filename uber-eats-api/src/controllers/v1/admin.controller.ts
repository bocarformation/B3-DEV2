import type { NextFunction, Request, Response } from "express";
import type { CreateRestaurantInputs } from "../../dto/index.js";
import { prisma } from "../../prisma/client.js";
import { generateSalt, hashPassword } from "../../utility/index.js";
import { sanitizeRestaurant } from "../../utility/index.js";

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
            return res.jsonError(`Email ${body.email} already exist`, 400)
            // return res.status(400).json({message: `Email ${body.email} already exist`});
        }

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(body.password, salt);

        const restaurant = await prisma.restaurant.create({
            data:  {...body, salt: salt, password: hashedPassword}
        })
        // res.status(201).json(sanitizeRestaurant(restaurant)); // avant formatage
        res.jsonSuccess(sanitizeRestaurant(restaurant), 201)
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
            return res.jsonError("No restaurant found", 404)
            // return res.status(404).json({message: "No restaurant found"})
        }

        // res.status(200).json(restaurants.map(sanitizeRestaurant));
        res.jsonSuccess(restaurants.map(sanitizeRestaurant)); // par défaut 200
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
            return res.jsonError("No restaurant found", 404)
            // return res.status(404).json({message: "Restaurant not found" });
        }
        res.jsonSuccess(sanitizeRestaurant(restaurant)); // Par défaut 200
        // res.status(200).json(sanitizeRestaurant(restaurant));
    } catch (error) {
        next(error);
    }
};


