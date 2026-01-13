import "dotenv/config";

export const getEnvVariable = (variableName: string) => {
    const value = process.env[variableName];

    if(!value){
        throw new Error(`Missing environment variable: ${variableName}`);
    }

    return value;
}

export const extractToken = (authorization: any ): string | null => {
    const [prefix, token] = authorization.split(" ");
    // Bearer ey59885651 (prefix = Bearer; token = ey59885651)
    const authorizationPrefixes = ["Bearer"]; 

    if(!authorizationPrefixes.includes(prefix)){
        return null;
    }

    return token;

}