import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { getManyLessons } from "../lib/lessonActions";

export const getLessons = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        logger.info("getLessons has called!");

        const data = parseInt(req.params.courseID);

        if(!data){
            throw new Error("Couldn't catch the data! Please check the api url!");
        }

        const lessons = await getManyLessons(data);

        res.status(200).json({lessons});
    }catch(err){
        logger.error("An error occured. Check the logs!");
        next(err);
    }
}