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

const app = express();
const cors = require("cors");

const setupExpress = () => {
  app.use(errorHandler);
  app.use(cors({origin:true}));
  app.use(express.json());
  
  app.route("/").get(root);
  app.route("/api/courses").get(getAllCourses);
  app.route("/api/courses/:courseID").get(findCourseById);
  app.route("/api/courses/:courseID/lessons").get(getLessons);

  app.route("/api/courses/:courseID/delete").delete(deleteCourse);
  app.route("/api/lessons/delete").delete(removeLesson);
 
  app.route("/api/courses/create").post(createCourse);
  app.route("/api/lessons/create").post(uploadLesson);

  app.route("/api/courses/update").patch(updateCourse);
  app.route("/api/lessons/update").patch(updateLesson);
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
