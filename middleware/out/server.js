"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./database"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.get('/server-status', cors_1.default(), function (request, response) {
            database_1.default.instance.getLastServersLog(function (serverLogs) {
                response.send(serverLogs);
            });
        });
        this.app.listen(8002);
    }
    return Server;
}());
exports.default = Server;
