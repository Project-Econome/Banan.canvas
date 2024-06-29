"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$measureText",
    version: "1.0.0",
    description: "Measure text.",
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
            description: "The text to measure.",
            rest: false,
            type: forgescript_1.ArgType.String,
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
            name: "property",
            description: "The result's property to return.",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.MeasureTextProperty,
            required: false
        }
    ],
    execute(ctx, [canvas, text, font, property]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        const result = canvs.measureText(text, font);
        return this.success(property ? result[classes_1.MeasureTextProperty[property]] : JSON.stringify(result));
    }
});
//# sourceMappingURL=measureText.js.map