"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$opacity",
    version: "1.0.0",
    description: "Get or set opacity in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to get/set opacity in.",
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
            name: "value",
            description: "New value",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, method, value]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        const result = canvs.opacity(method, value ?? undefined);
        return this.success(method === classes_1.GetOrSet.get ?
            result :
            undefined);
    }
});
//# sourceMappingURL=opacity.js.map