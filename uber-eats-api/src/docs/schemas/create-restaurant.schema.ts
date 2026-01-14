/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRestaurantInputs:
 *       type: object
 *       required:
 *         - name
 *         - ownerName
 *         - foodTypes
 *         - postalcode
 *         - address
 *         - phone
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "La Boucherie"
 *         ownerName:
 *           type: string
 *           example: "Jean-Pierre"
 *         foodTypes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Pizza", "Burger", "French"]
 *         postalcode:
 *           type: string
 *           example: "75001"
 *         address:
 *           type: string
 *           example: "Rue de la Paix"
 *         phone:
 *           type: string
 *           example: "0612345678"
 *         email:
 *           type: string
 *           format: email
 *           example: "jean-pierre@gmail.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "123456"
 */
 