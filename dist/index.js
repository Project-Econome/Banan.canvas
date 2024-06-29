"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeCanvas = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const path_1 = require("path");
class ForgeCanvas extends forgescript_1.ForgeExtension {
    name = "BananCanvas";
    description = "Well the name says what it does.";
    version = "2.0.0";
    init() {
        this.load((0, path_1.resolve)(__dirname, "./functions"));
    }
    ;
}
exports.ForgeCanvas = ForgeCanvas;
;
//# sourceMappingURL=index.js.map
