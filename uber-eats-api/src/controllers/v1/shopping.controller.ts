import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/client.js";
import { sanitizeRestaurant } from "../../utility/sanitizer.js";

export const getAvailableFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const postalcode = req.params.postalcode as string;

        if(!postalcode){
            return res.jsonError("Please enter valid zip code", 400)
        }
        const availableRestaurants = await prisma.restaurant.findMany({
            where: {postalcode, serviceAvailable: true},
            include: {food: true}
        });

        if(!availableRestaurants){
            return res.jsonError("No food found", 404);
        }

        const availableFoods =  availableRestaurants.flatMap(r => r.food); 
        res.jsonSuccess(availableFoods)
        
    } catch (error) {
        next(error);
    }
};

export const getTopRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

        const postalcode = req.params.postalcode as string

        const topRestaurants = await prisma.restaurant.findMany({
            where:  {postalcode, serviceAvailable: true},
            orderBy: {rating: 'desc'},
            take: 5
        });

        if(!topRestaurants){
            return res.jsonError("No restaurant found", 404)
        }
        
        res.jsonSuccess(topRestaurants.map(sanitizeRestaurant))
    } catch (error) {
        next(error);
    }
};

export const getFoodsIn30mins = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const postalcode = req.params.postalcode as string
        const foods = await prisma.restaurant.findMany({
            where: {postalcode, serviceAvailable: true},
            include: {food: true}
        });

        if(!foods){
            return res.jsonError("No food found", 404);
        }

        const foodsIn30mins = foods.flatMap(r => r.food).filter(food => food.readyTime <= 30);
        res.jsonSuccess(foodsIn30mins);

    } catch (error) {
        next(error);
    }
};

export const searchFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

        const postalcode = req.params.postalcode as string; // /75010
        const search = req.query.search as string; // ?search=pizza
        const restaurants = await prisma.restaurant.findMany({
            where:{postalcode, serviceAvailable: true},
            include: {food: true}
        });

        if(!restaurants){
            return res.jsonError("No restaurant found", 404);
        }

        const foods = restaurants.flatMap(r => r.food);
        const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

        res.jsonSuccess(filteredFoods)
        
    } catch (error) {
        next(error);
    }
};