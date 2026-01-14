import { Router } from "express";
// import { registerRestaurant } from "../controllers/admin.controller.js";
import { registerRestaurant, getRestaurants, getRestaurantById } from "../../controllers/v1/index";

const router = Router();


/**
 * @swagger
 * /admin/restaurants:
 *   post:
 *     summary: Enregistrer un nouveau restaurant
 *     description: Permet à un administrateur d’ajouter un restaurant à la base de données.
 *     tags:
 *       - Restaurants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ownerName
 *               - foodTypes
 *               - postalcode
 *               - address
 *               - phone
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du restaurant
 *                 example: "La Cabane"
 *               ownerName:
 *                 type: string
 *                 description: Nom du propriétaire
 *                 example: "Jean-Louis"
 *               foodTypes:
 *                 type: array
 *                 description: Types de nourriture proposés
 *                 items:
 *                   type: string
 *                 example: ["Pizza", "Burger", "French"]
 *               postalcode:
 *                 type: string
 *                 description: Code postal du restaurant
 *                 example: "75001"
 *               address:
 *                 type: string
 *                 description: Adresse du restaurant
 *                 example: "Rue de la Paix"
 *               phone:
 *                 type: string
 *                 description: Numéro de téléphone
 *                 example: "0612345678"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l’établissement
 *                 example: "jean-louis@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mot de passe associé au compte du restaurant
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       409:
 *         description: Un restaurant avec cet email ou nom existe déjà
 *       400:
 *         description: Données de requête invalides
 */
router.post("/restaurants", registerRestaurant);
router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);

export { router as AdminRoute};