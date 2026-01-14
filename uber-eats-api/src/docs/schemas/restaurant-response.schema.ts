/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantProfileResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "62f9fcfc-cc05-4994-9d98-3a562de59c29"
 *             name:
 *               type: string
 *               example: "Le Petit Bistro"
 *             ownerName:
 *               type: string
 *               example: "Jean Dupont"
 *             foodTypes:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["French", "Seafood", "Italian"]
 *             postalcode:
 *               type: string
 *               example: "75001"
 *             address:
 *               type: string
 *               example: "10 Rue de la Roquette"
 *             phone:
 *               type: string
 *               example: "01 45 67 89 10"
 *             email:
 *               type: string
 *               format: email
 *               example: "lepetitbistro@gmail.com"
 *             serviceAvailable:
 *               type: boolean
 *               example: true
 *             coverImages:
 *               type: array
 *               items:
 *                 type: string
 *               example: [
 *                 "28abe751-7230-4647-b2aa-b33d81a2526e_restaurant_1.jpg",
 *                 "41908e35-53e8-42e8-9173-83710ce7089d_restaurant_1.jpg"
 *               ]
 *             rating:
 *               type: number
 *               example: 0
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-04-23T11:56:57.065Z"
 */