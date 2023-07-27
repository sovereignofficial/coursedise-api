import * as express from 'express';
import { root } from './routes/root';

const app = express();

const setupExpress = () =>{
  app.route("/").get(root);
}

const startServer = () =>{
    app.listen(9000, ()=>{
        console.log("API runs on http://localhost:9000/")
    })
}

setupExpress();
startServer();