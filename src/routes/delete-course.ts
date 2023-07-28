import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { deleteOneCourse } from "../lib/courseActions";

export const deleteCourse = async (req:Request, res:Response , next:NextFunction) => {
    try{
        logger.info(`deleteCourse has been called.`);

        const data = parseInt(req.params.courseID);

        if(!data){
            throw new Error("Please provide a data!")
        }
        const result = await deleteOneCourse(data);

        res.status(200).json({result});
    }catch(err){
        logger.error(`An error occured. Check the logs.`);
        next(err);
    }
}