"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$filter",
    version: "1.0.0",
    description: "Manage canvas filters.",
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
            description: "Method. (add/set/remove/clear/get/parse)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.FilterMethod,
            required: true
        },
        {
            name: "filter",
            description: "Filter.",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.Filter,
            required: false
        },
        {
            name: "value",
            description: "New value",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, method, filter, value]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        const result = canvs.filter(method, filter ?? undefined, value ?? undefined);
        return this.success(method === classes_1.FilterMethod.get
            ? result
            : (method === classes_1.FilterMethod.parse
                ? JSON.stringify(result)
                : undefined));
    }
});
//# sourceMappingURL=filter.js.map