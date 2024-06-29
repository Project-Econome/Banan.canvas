import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$drawCanvas",
    version: "1.0.0",
    description: "Draws a canvas on canvas",
    unwrap: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where another canvas will be placed.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "name",
            description: "The canvas to draw name.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of the canvas.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of the canvas.",
            rest: false,
            type: ArgType.Number,
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
    async execute(ctx, [canvas, name, x, y, width, height]) {
        canvas = canvas?.trim();
        name = name?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`),
              canvs2 = ctx.getEnvironmentKey(`canvas_${canvas}`);

        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        if (!canvs2 || !(canvs2 instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${name}'`);

        await canvs.drawImage(
            canvs2.render(),
            x,
            y,
            width ?? undefined,
            height ?? undefined
        );
        return this.success();
    }
});