import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { uploadOneLesson } from "../lib/lessonActions";

export const uploadLesson = async (req:Request, res:Response, next:NextFunction) => {
    try{
        logger.info(`updateCourse has been called.`);

        const data = req.body;

        if(!data){
            throw new Error("Lesson data didn't provided.");
        }

        const lesson = await uploadOneLesson(data,data.courseId);

        res.status(200).json({lesson})
    }catch(err){
        logger.error(`An error occured. Check the logs.`);
        next(err);
    }
}