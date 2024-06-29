"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$canvasTrim",
    version: "1.0.0",
    description: "Trim a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to trim.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        }
    ],
    execute(ctx, [canvas]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        canvs.trim();
        return this.success();
    }
});
//# sourceMappingURL=canvasTrim.js.map