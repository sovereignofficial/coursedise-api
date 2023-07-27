"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var root_1 = require("./routes/root");
var app = express();
var setupExpress = function () {
    app.route("/").get(root_1.root);
};
var startServer = function () {
    app.listen(9000, function () {
        console.log("API runs on http://localhost:9000/");
    });
};
setupExpress();
startServer();
