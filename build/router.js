"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crawl_1 = __importDefault(require("./crawl"));
var Analyzer_1 = __importDefault(require("./Analyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('hello world');
});
router.get('/getData', function (req, res) {
    var secret = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    var analyzer = Analyzer_1.default.getInstance();
    new crawl_1.default(analyzer, url);
    res.send('get Data success!');
});
exports.default = router;
