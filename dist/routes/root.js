"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
function root(request, response) {
    response.status(200).send("<h1> Express server is running.!");
}
exports.root = root;
