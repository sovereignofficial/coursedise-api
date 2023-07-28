import { NextFunction , Request , Response } from "express";
import { logger } from "../logger"
import { AppDataSource } from "../data-source";
import { Course } from "../models/course";

export const createCourse = async (req:Request , res:Response,next:NextFunction) =>{
    try{
        logger.info("Create course endpoint called.");

        const data = req.body;

        logger.info(`DATA COME FROM REQUEST: ${req.body}`)

        if(!data){
            throw new Error("There are no enough data provided to create a new course.")
        }

      const newCourse = await AppDataSource.manager.transaction(
            "REPEATABLE READ",
            async (transactionalEntityManager)=>{

                const repository = transactionalEntityManager.getRepository(Course)

               const result = await repository
                .createQueryBuilder("courses")
                .select("MAX(courses.sequenceNo)","max")
                .getRawOne();

               const course = repository.create({
                    ...data,
                    sequenceNo:(result?.max ?? 0) + 1,

                })

                await repository.save(course);
                
                return course
            }
         )
        
        res.status(200).json({newCourse})
    }catch(err){
        logger.error("An error happened while creating new course. Application has aborted.");
        next(err);
    }
}