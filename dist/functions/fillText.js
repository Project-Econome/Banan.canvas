"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$fillText",
    version: "0.1.0",
    description: "Draws text in provided canvas.",
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
            name: "text",
            description: "The text to draw.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of text.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of text.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "font",
            description: "The text font.",
            rest: false,
            type: forgescript_1.ArgType.String,
            check: classes_1.CanvasUtil.isValidFont,
            required: true
        },
        {
            name: "color",
            description: "The text color.",
            rest: false,
            type: forgescript_1.ArgType.Color,
            required: true
        },
        {
            name: "maxWidth",
            description: "The text max width.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, text, x, y, font, color, maxWidth]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        canvs.fillText(text, x, y, font, color, maxWidth ?? undefined);
        return this.success();
    }
});
//# sourceMappingURL=fillText.js.map