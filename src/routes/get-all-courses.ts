import { Request, Response, NextFunction } from "express"
import { logger } from "../logger"
import { getManyCourse } from "../lib/courseActions";


export const getAllCourses = async (req: Request, res: Response , next:NextFunction) => {
    try{
        logger.debug("Called getAllCourse()");

        const courses = await getManyCourse();
        
        res.status(200).json({courses});
    
    }catch(err){
        logger.error("An error happened while calling all courses");
        next(err);
    }
}