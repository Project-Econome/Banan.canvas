"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$rotate",
    version: "1.0.0",
    description: "Rotates a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to rotate.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "angle",
            description: "Rotation angle.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        }
    ],
    execute(ctx, [canvas, angle]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        canvs.rotate(angle);
        return this.success();
    }
});
//# sourceMappingURL=rotate.js.map