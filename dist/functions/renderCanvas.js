"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$renderCanvas",
    version: "0.1.0",
    description: "Renders and attaches the canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the image will be placed.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "name",
            description: "The name with the extension of the image to be attached as",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        }
    ],
    execute(ctx, [canvas, name]) {
        canvas = canvas?.trim();
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        const attachment = new discord_js_1.AttachmentBuilder(canvs.render(), {
            name
        });
        ctx.container.files.push(attachment);
        return this.success();
    }
});
//# sourceMappingURL=renderCanvas.js.map