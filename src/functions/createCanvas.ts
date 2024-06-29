import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder } from "../classes";

export default new NativeFunction({
    name: "$createCanvas",
    version: "0.1.0",
    description: "Create new blank canvas.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the canvas",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "width",
            description: "The width of the canvas",
            rest: false,
            type: ArgType.Number,
            required: false
        },
        {
            name: "height",
            description: "The height of the canvas",
            rest: false,
            type: ArgType.Number,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [name, width, height]) {
        ctx.setEnvironmentKey(`canvas_${name?.trim()}`, new CanvasBuilder(width ?? 512, height ?? 512));
        return this.success();
    }
});