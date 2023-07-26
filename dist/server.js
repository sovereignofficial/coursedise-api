import * as express from 'express';
import { root } from './routes/root';
const app = express();
const setupExpress = () => {
    app.route("/").get(root);
};
const startServer = () => {
    app.listen(9000, () => {
        console.log("API runs on 9000 port...");
    });
};
setupExpress();
startServer();
