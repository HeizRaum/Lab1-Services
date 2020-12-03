"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (request, response) {
    response.status(200).send('Server running!');
    console.log("Connection from " + request.hostname + ", at " + request.ip);
});
app.listen(3000 || process.env.PORT, function () {
    console.log("Server listening at: " + process.env.PORT);
});
