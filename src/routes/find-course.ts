import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { findOneCourse } from "../lib/courseActions";

export const findCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Find Course API endpoint called.");

        const data = parseInt(req.params.courseID);

        if (!data) {
            throw new Error("Please provide a course ID!");
        }


        const course = await findOneCourse(data);
        
        if(!course){
            throw new Error(`Couldn't find a course by provided ID:${data}`)
        }

        res.status(200).json({
            course
        })

    } catch (err) {
        logger.error(`An unexpected error happened. Check the logs!`);
        next(err);
     }
}