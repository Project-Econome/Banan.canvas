import { AttachmentBuilder } from "discord.js"
import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { CanvasBuilder } from "../classes";

export default new NativeFunction({
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
            type: ArgType.String,
            required: true
        },
        {
            name: "name",
            description: "The name with the extension of the image to be attached as",
            rest: false,
            type: ArgType.String,
            required: true
        }
    ],
    execute(ctx, [canvas, name]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const attachment = new AttachmentBuilder(canvs.render(),{
            name
        });

        ctx.container.files.push(attachment);
        return this.success();
    }
});