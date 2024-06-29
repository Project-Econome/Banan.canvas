"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$alignText",
    version: "0.2.0",
    description: "Sets text align in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to set text align in.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "align",
            description: "Text align.",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.textAlign,
            required: true
        }
    ],
    execute(ctx, [canvas, align]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        canvs.setTextAlign(align);
        return this.success();
    }
});
//# sourceMappingURL=alignText.js.map