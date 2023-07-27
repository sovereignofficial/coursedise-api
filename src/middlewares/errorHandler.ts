import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export const errorHandler = (err,req:Request, res:Response, next:NextFunction)=>{
    logger.error(`Error Handler has been triggered: ${err}`);

    //while the occasions that it's not able to send http response
    if(res.headersSent){
        return next(err);
    }
    
    res.status(500).json({
        status:"error",
        message:"An error happened, please check the logs."
    })
}