import { Request, Response, NextFunction } from "express"
import { logger } from "../logger"
import { AppDataSource } from "../data-source";
import { Course } from "../models/course";

export const getAllCourses = async (req: Request, res: Response , next:NextFunction) => {
    try{
        logger.debug("Called getAllCourse()");

        const courses = await AppDataSource
            .getRepository(Course)
            .createQueryBuilder("courses")
            .orderBy("courses.sequenceNo")
            .getMany();
        res.status(200).json({courses});
    
    }catch(err){
        logger.error("An error happened while calling all courses");
        next(err);
    }
}