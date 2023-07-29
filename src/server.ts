import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  console.log("Error loading environment variables, aborting.");
  process.exit(1);
}

import "reflect-metadata";
import * as express from 'express';
import { root } from './routes/root';
import { logger } from './logger';
import { AppDataSource } from './data-source';
import { getAllCourses } from './routes/get-all-courses';
import { errorHandler } from './middlewares/errorHandler';
import { createCourse } from './routes/create-course';
import { findCourseById } from './routes/find-course';
import { deleteCourse } from './routes/delete-course';
import { updateCourse } from './routes/update-course';
import { uploadLesson } from './routes/upload-lesson';
import { getLessons } from './routes/get-lessons';
import { updateLesson } from './routes/update-lesson';
import { removeLesson } from './routes/remove-lesson';
import { register } from './routes/auth/register';
import { login } from './routes/auth/login';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
const cors = require("cors");

const setupExpress = () => {
  app.use(errorHandler);
  app.use(cors({origin:true}));
  app.use(express.json());
  
  app.route("/").get(root);
  app.route("/api/courses").get(authMiddleware,getAllCourses);
  app.route("/api/courses/:courseID").get(authMiddleware,findCourseById);
  app.route("/api/courses/:courseID/lessons").get(authMiddleware,getLessons);

  app.route("/api/courses/:courseID/delete").delete(authMiddleware,deleteCourse);
  app.route("/api/lessons/delete").delete(authMiddleware,removeLesson);
 
  app.route("/api/courses/create").post(authMiddleware,createCourse);
  app.route("/api/lessons/create").post(authMiddleware,uploadLesson);
  app.route("/api/users/register").post(register);
  app.route("/api/users/login").post(login)

  app.route("/api/courses/update").patch(authMiddleware,updateCourse);
  app.route("/api/lessons/update").patch(authMiddleware,updateLesson);
}

const startServer = () => {
  let PORT = process.env.PORT;
  app.listen(PORT, () => {
    logger.info(`API runs at http://localhost:${PORT}/`);
  })
}

AppDataSource.initialize()
.then(()=>{
  logger.info("The datasource has been initialized successfully.")
  setupExpress();
  startServer();
})
.catch((err)=>{
  logger.error(`Application aborted. The error on below has been happened:${err}`);
  process.exit(1);
})
