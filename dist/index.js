"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BananCanvas = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const path_1 = require("path");
class BananCanvas extends forgescript_1.ForgeExtension {
    name = "BananCanvas";
    description = "Well the name says what it does.";
    version = "2.0.0";
    init() {
        this.load((0, path_1.resolve)(__dirname, "./functions"));
    }
    ;
}
exports.BananCanvas = BananCanvas;
;
//# sourceMappingURL=index.js.map
