"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
exports.default = new forgescript_1.NativeFunction({
    name: "$registerFont",
    version: "0.2.0",
    description: "Register a custom font.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "path",
            description: "The path of the font that you want to add.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "name",
            description: "The name you want to give to the font",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        }
    ],
    execute(ctx, [path, name]) {
        if (!(0, node_fs_1.existsSync)(path))
            return this.customError("Invalid font path");
        canvas_1.GlobalFonts.registerFromPath(path, name);
        return this.success();
    }
});
//# sourceMappingURL=registerFont.js.map