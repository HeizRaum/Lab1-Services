"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
//
//
//app.get('/serverStatus', Cors(), function(request, response) {
//  response.json({
//
//  });
//});
//
//app.listen(8000);
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.get('/serverStatus', cors_1.default(), function (request, response) {
            console.log(request);
        });
        this.app.listen(8000);
    }
    return Server;
}());
exports.default = Server;
