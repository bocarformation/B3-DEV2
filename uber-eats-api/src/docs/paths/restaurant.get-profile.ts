
/**
 * @swagger
 * /restaurant/profile:
 *   get:
 *     summary: Récupérer le profil du restaurant connecté
 *     deprecated: true
 *     tags:
 *       - Restaurants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations du restaurant récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantProfileResponse'
 *       403:
 *         description: Token manquant ou invalide
 */
    