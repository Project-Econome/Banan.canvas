"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const node_fs_1 = require("node:fs");
const classes_1 = require("../classes");
const node_path_1 = require("node:path");
exports.default = new forgescript_1.NativeFunction({
    name: "$downloadCanvas",
    version: "2.2.0",
    description: "Download a Canvas.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the canvas",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "path",
            description: "The path of the canvas",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [canvas, path = "{canvas}.png"]) {
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        const buffer = canvs.render();
        if (!buffer)
            return this.customError("Something went wrong.");
        (0, node_fs_1.writeFileSync)((0, node_path_1.join)(process.cwd(), (path ?? "{canvas}.png").replace(/{canvas}/g, canvas)), buffer);
        return this.success();
    }
});
//# sourceMappingURL=downloadCanvas.js.map