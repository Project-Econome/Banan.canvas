"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$strokeRect",
    version: "0.1.0",
    description: "Draws a stroke rect in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw text on.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "color",
            description: "The color of rect.",
            rest: false,
            type: forgescript_1.ArgType.Color,
            required: true
        },
        {
            name: "x",
            description: "The X position of rect.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of rect.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "width",
            description: "The rect width.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "height",
            description: "The rect height.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "lineWidth",
            description: "The stroke lines width.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        },
        {
            name: "radius",
            description: "The rect corners radius.",
            rest: true,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, color, x, y, width, height, lineWidth, radius]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        canvs.strokeRect(color, x, y, width, height, lineWidth ?? undefined, radius && radius.length === 1 ? radius[0] : radius);
        return this.success();
    }
});
//# sourceMappingURL=strokeRect.js.map