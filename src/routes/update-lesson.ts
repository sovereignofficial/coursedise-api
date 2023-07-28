import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { updateOneLesson } from "../lib/lessonActions";


export const updateLesson = async (req:Request, res:Response , next:NextFunction) => {
    try{
        logger.info("updateLesson has called!");

        const data = req.body;

        if(!data.changes || !data.lessonId){
            throw new Error("The data has not sent accurately!");
        }

        const lesson = await updateOneLesson(data.lessonId , data.changes);
        
        res.status(200).json({lesson});
    }catch(err){
        logger.error("An error occured, please check the logs!");
        next(err);
    }
}