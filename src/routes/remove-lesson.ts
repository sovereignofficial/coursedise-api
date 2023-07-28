import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { removeOneLesson } from "../lib/lessonActions";


export const removeLesson = async (req:Request, res:Response , next:NextFunction) => {
    try{
        logger.info("removeLesson has called!");

        const data = parseInt(req.body.lessonId);

        if(!data){
            throw new Error("Couldn't collect the data!");
        }

        const result = await removeOneLesson(data);

        res.status(200).json({result});
    }catch(err){
        logger.error("An error occured, please check the logs!")
        next(err);
    }
}