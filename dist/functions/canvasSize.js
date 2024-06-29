"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$canvasSize",
    version: "1.0.0",
    description: "Get or set the canvas size.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "method",
            description: "Method. (get/set)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.GetOrSet,
            required: true
        },
        {
            name: "property",
            description: "Canvas size property.",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.WidthOrHeight,
            required: false
        },
        {
            name: "value",
            description: "New value.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, method, property, value]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        const ccanvas = canvs.getContext().canvas;
        if (method === classes_1.GetOrSet.get)
            return this.success(property
                ? ccanvas[classes_1.WidthOrHeight[property]]
                : JSON.stringify({ width: ccanvas.width, height: ccanvas.height }));
        if (property === null)
            return this.customError("No property provided.");
        if (!value)
            return this.customError("No new value provided.");
        canvs.resize((property === 0 ? value : ccanvas.width), (property === 1 ? value : ccanvas.height));
        return this.success();
    }
});
//# sourceMappingURL=canvasSize.js.map