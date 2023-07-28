import { NextFunction, Request, Response } from "express";
import { logger } from "../logger"
import { createOneCourse } from "../lib/courseActions";

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Create course endpoint called.");

        const data = req.body;

        if (!data) {
            throw new Error("There are no enough data provided to create a new course.")
        }

        const newCourse = await createOneCourse(data);

        res.status(200).json({ newCourse })
    } catch (err) {
        logger.error("An error happened while creating new course. Application has aborted.");
        next(err);
    }
}