import bcrypt from "bcrypt";

export const generateSalt = async ()  => {
    return bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string ) => {
    return bcrypt.hash(password, salt)
}

