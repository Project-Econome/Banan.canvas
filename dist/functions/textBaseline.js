"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$textBaseline",
    version: "1.0.0",
    description: "Sets text baseline in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to set text baseline in.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "baseline",
            description: "Text baseline.",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.textBaseline,
            required: true
        }
    ],
    execute(ctx, [canvas, baseline]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        canvs.setTextBaseline(baseline);
        return this.success();
    }
});
//# sourceMappingURL=textBaseline.js.map