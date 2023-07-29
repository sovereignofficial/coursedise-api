import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";
import { AppDataSource } from "../../data-source";
import { User } from "../../models/user";
import { encryptPassword } from "../../lib/passwords";
const crypto = require('crypto');

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.debug("called register !");

        const { email, pictureUrl, password, isAdmin } = req.body;

        if (!email) {
            throw new Error("Couldn't extract the email from the request!")
        }
        if (!password) {
            throw new Error("Couldn't extract the password from the request!")
        }

        const repository = AppDataSource.getRepository(User);

        const foundUser = await repository.createQueryBuilder("users")
            .where("users.email = :email", { email })
            .getOne();

        if (foundUser) {
            throw new Error(`"This email being used!" ${foundUser}`);
        }

        const passwordSalt = crypto.randomBytes(64).toString("hex");

        const passwordHash = await encryptPassword(password,passwordSalt);

       const newUser = repository.create({
            email,
            pictureUrl,
            isAdmin,
            passwordHash,
            passwordSalt
        })

        const user = await AppDataSource.manager.save(newUser);

        res.status(200).json({
            email,
            pictureUrl,
            isAdmin
        })


    } catch (err) {
        logger.error("An error occured, check the logs!");
        next(err)
    }
}