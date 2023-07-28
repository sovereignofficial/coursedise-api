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

const app = express();
const cors = require("cors");

const setupExpress = () => {
  app.use(errorHandler);
  app.use(cors({origin:true}));
  
  app.route("/").get(root);
  app.route("/api/courses").get(getAllCourses);

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
