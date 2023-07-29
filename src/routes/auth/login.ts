import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";
import { AppDataSource } from "../../data-source";
import { User } from "../../models/user";
import { encryptPassword } from "../../lib/passwords";

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.debug("called login!");

        const {email,password} = req.body;

        if (!email) {
            throw new Error("Couldn't extract the email from the request!")
        }
        if (!password) {
            throw new Error("Couldn't extract the password from the request!")
        }

        const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("users")
        .where("email = :email",{email})
        .getOne();

        if(!user){
            throw new Error(`Login denied! No user found with ${email} email!`);
        }

        const passwordHash = await encryptPassword(password,user.passwordSalt);
        
        if(passwordHash !== user.passwordHash){
            throw new Error("Wrong password!");
        }


        const authJwt = {
            userId:user.id,
            email:user.email,
            pictureUrl:user.pictureUrl,
            isAdmin:user.isAdmin
        }

        const token = await jwt.sign(authJwt,JWT_SECRET);

        logger.info("user has succesfully logged in!");
        res.status(200).json({
            message:"Login successfull!",
            user:{
                userId:user.id,
                email:user.email,
                pictureUrl:user.pictureUrl,
                isAdmin:user.isAdmin
            },
            token
        })
    } catch (err) {
        logger.error("An error occured, check the logs!");
        next(err)
    }
}