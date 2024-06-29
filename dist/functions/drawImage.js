"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$drawImage",
    version: "0.1.0",
    description: "Draws an image on canvas",
    unwrap: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the image will be placed.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "path",
            description: "The image path.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of the image.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of the image.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "width",
            description: "The width of the image",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        },
        {
            name: "height",
            description: "The height of the image",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        },
        {
            name: "radius",
            description: "The radius of image corners.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [canvas, path, x, y, width, height, radius]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        await canvs.drawImage(path, x, y, width ?? undefined, height ?? undefined, radius ?? undefined);
        return this.success();
    }
});
//# sourceMappingURL=drawImage.js.map