import { NextFunction, Response, Request } from "express";
import { logger } from "../logger";

const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        logger.info(`the authentication jwt is not present, access denied.`);
        res.sendStatus(403);
        return;
    }
   
    await checkValidityJWT(token)
    .then(user =>{
        logger.info(`Authentication JWT succesfully decoded: ${user}`);
        req["user"] = user;
        next();
    }).catch(err=>{
        logger.error("Couldn't validate the jwt token!");
        res.sendStatus(403);
    })

}

const checkValidityJWT = async (token:string)=>{
    // Bearer token based authentication allowed.
    const user = await jwt.verify(token.split(" ")[1],jwtSecret);

    logger.info(`Found user in JWT: ${user}`);

    return user;
}
