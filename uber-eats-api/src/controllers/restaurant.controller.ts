import type { NextFunction, Request, Response } from "express";
import type { LoginInputs } from "../dto/index";
import { prisma } from "../prisma/client";
import { isValidPassword, generateSignature } from "../utility/index";


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