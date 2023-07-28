import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { updateOneCourse } from "../lib/courseActions";

export const updateCourse = async (req:Request , res:Response , next:NextFunction) =>{
    try{
        logger.info(`updateCourse has been called.`);

        const data = req.body;
        if(!data.id || !data.changes){
            throw new Error("Couldn't catch enough please check  whether client provided id and changes well.")
        }
        const updatedCourse = await updateOneCourse(data.id , data.changes);
        
        res.status(200).json({updatedCourse})
    }catch(err){
        logger.error(`An error occured. Check the logs.`);
        next(err);
    }
}