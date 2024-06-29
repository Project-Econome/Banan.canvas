"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$createCanvas",
    version: "0.1.0",
    description: "Create new blank canvas.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the canvas",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "width",
            description: "The width of the canvas",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        },
        {
            name: "height",
            description: "The height of the canvas",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [name, width, height]) {
        ctx.setEnvironmentKey(`canvas_${name?.trim()}`, new classes_1.CanvasBuilder(width ?? 512, height ?? 512));
        return this.success();
    }
});
//# sourceMappingURL=createCanvas.js.map