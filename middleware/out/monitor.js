"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var Monitor = /** @class */ (function () {
    function Monitor(server1Url, server2Url) {
        console.log('Monitor started');
        this.monitorServer(server1Url);
        this.monitorServer(server2Url);
    }
    Monitor.prototype.monitorServer = function (serverUrl) {
        http_1.default.request({
            host: 'localhost',
            port: '3000',
            path: '/',
            method: 'GET'
        }, function (response) {
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('close', function () {
                try {
                    console.log(JSON.parse(body));
                }
                catch (error) {
                    console.log('Error parsing the JSON, from server!');
                }
            });
        }).end();
    };
    return Monitor;
}());
exports.default = Monitor;
