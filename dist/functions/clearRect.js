"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$clearRect",
    version: "1.0.0",
    description: "Draws a clear rect in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw a clear rect on.",
            rest: false,
            type: forgescript_1.ArgType.String,
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
            name: "radius",
            description: "The rect corners radius.",
            rest: true,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [name, x, y, width, height, radius]) {
        name = name?.trim();
        const canvas = ctx.getEnvironmentKey(`canvas_${name}`);
        if (!canvas || !(canvas instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${name}'`);
        canvas.clearRect(x, y, width, height, radius && radius.length === 1 ? radius[0] : radius);
        return this.success();
    }
});
//# sourceMappingURL=clearRect.js.map