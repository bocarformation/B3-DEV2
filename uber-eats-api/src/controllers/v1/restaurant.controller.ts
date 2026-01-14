import type { NextFunction, Request, Response } from "express";
import type { LoginInputs,EditRestaurantInputs, CreateFoodInputs } from "../../dto/index.js";
import { prisma } from "../../prisma/client.js";
import { isValidPassword, generateSignature } from "../../utility/index.js";
import { sanitizeRestaurant } from "../../utility/index.js";
import { uploadImagesMiddleware } from "../../middlewares/index.js";


export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {email, password} = req.body as LoginInputs;

        const restaurant = await prisma.restaurant.findUnique({
            where: {email: email}
        });

        // Pour éviter de donner des infos à par exemple une personne qui voudrait attaquer notre site
        // Si le mail existe déjà dans notre BDD, on va mettre un message d'erreur générique
        if(!restaurant){
            return res.jsonError("Invalid credentials", 401)
        }

        const isPasswordMatch = await isValidPassword(password, restaurant.password, restaurant.salt);

        if(!isPasswordMatch){
            return res.jsonError("Invalid credentials",401)
        }

        // Création du token avec notre fonction
        const token = generateSignature({
            id: restaurant.id,
            name: restaurant.name,
            ownerName: restaurant.ownerName,
            email: restaurant.email, 
            foodTypes: restaurant.foodTypes
        })


        res.jsonSuccess(token)

    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

        if(!req.user.id){
            return res.jsonError("Acces unauthorized", 403)
        }
        const restaurant = await prisma.restaurant.findUnique({
            where: {id: req.user.id}
        })

        if(!restaurant){
            return res.jsonError("Restaurant not found", 404)
        }
        
        res.jsonSuccess(sanitizeRestaurant(restaurant))
    } catch (error) {
        next(error);
    }
};


export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {id} = req.user;
        const {name, ownerName, foodTypes, address, phone} = req.body as EditRestaurantInputs;

        const restaurant = await prisma.restaurant.update({
            where: {id},
            data: {name, ownerName, foodTypes, address, phone}
        });

        if(!restaurant){
            return res.jsonError("Restaurant not found", 404);
        }

        res.jsonSuccess(sanitizeRestaurant(restaurant))
    } catch (error) {
        next(error);
    }
};


export const updateServiceAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {id} = req.user;

        const restaurant = await prisma.restaurant.findUnique({
            where: {id}
        });

        if(!restaurant){
            return res.jsonError("Restaurant not found", 404);
        }

        const updatedRestaurant = await prisma.restaurant.update({
            where: {id},
            data: { serviceAvailable: !restaurant.serviceAvailable } // toggle
        });

        res.jsonSuccess(sanitizeRestaurant(updatedRestaurant))
        
    } catch (error) {
        next(error);
    }
};

export const updateCoverImages = [uploadImagesMiddleware,
    async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {id} = req.user;

        const restaurant = await prisma.restaurant.findUnique({
            where: {id}
        });

        if(!restaurant){
            return res.jsonError("Restaurant not found", 404);
        }

        const files = req.files as Express.Multer.File[];
        const images = files.map(file => file.filename);

        restaurant.coverImages.push(...images);

        const updatedRestaurant = await prisma.restaurant.update({
            where: {id},
            data: {coverImages: restaurant.coverImages}
        });

        res.jsonSuccess(sanitizeRestaurant(updatedRestaurant))
    } catch (error) {
        next(error);
    }
}];

export const addFood = [uploadImagesMiddleware, async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {id} = req.user;

        const body = req.body as CreateFoodInputs;
        console.log(body);
        
        const restaurant = await prisma.restaurant.findUnique({
            where: {id}
        })

        if(!restaurant){
            return res.jsonError("Restaurant not found", 404)
        }

        const files = req.files as Express.Multer.File[];
        const images = files.map(file => file.filename);

        const readyTime = Number(body.readyTime);
        const price = Number(body.price);
        const food = await prisma.food.create({
            data: {...body, readyTime, price, images, restaurantId: id}
        });

        res.jsonSuccess(food, 201)
    } catch (error) {
        next(error);
    }
}];