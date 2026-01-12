
export const sanitizeRestaurant = (restaurant: any ) => {
   const {password, salt, ...safeData} = restaurant
    return safeData;
}