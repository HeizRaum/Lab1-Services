"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("./database"));
var http_1 = __importDefault(require("http"));
var Monitor = /** @class */ (function () {
    function Monitor(server1, server2) {
        console.log('Monitor started');
        this.startMonitoringServer(server1);
        this.startMonitoringServer(server2);
    }
    Monitor.prototype.startMonitoringServer = function (server) {
        this.requestFromServer(server);
    };
    Monitor.prototype.requestFromServer = function (server) {
        var _this = this;
        http_1.default.request({
            host: server.host,
            port: server.port,
            path: server.path,
            method: 'GET'
        }, function (response) {
            response.on('data', function () {
                console.log("Server response: " + response.statusCode);
                _this.writeToDatabase(server.name);
            });
            response.on('end', function () {
                setTimeout(function () { return _this.requestFromServer(server); }, Monitor.TIMEOUT_TIME);
            });
        }).addListener('error', function () {
            console.log('Error: Server did not send a response!');
            setTimeout(function () { return _this.requestFromServer(server); }, Monitor.TIMEOUT_TIME);
        }).end();
    };
    Monitor.prototype.writeToDatabase = function (serverName) {
        database_1.default.instance.writeLog(Date.now(), serverName);
    };
    Monitor.TIMEOUT_TIME = 3000;
    return Monitor;
}());
exports.default = Monitor;
