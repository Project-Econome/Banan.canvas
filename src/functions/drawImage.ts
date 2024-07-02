import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$drawImage",
    version: "0.1.0",
    description: "Draws an image on canvas",
    unwrap: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the image will be placed.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "path",
            description: "The image path.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of the image.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of the image.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "width",
            description: "The width of the image",
            rest: false,
            type: ArgType.Number,
            required: false
        },
        {
            name: "height",
            description: "The height of the image",
            rest: false,
            type: ArgType.Number,
            required: false
        },
        {
            name: "radius",
            description: "The radius of image corners.",
            rest: true,
            type: ArgType.Number,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [canvas, path, x, y, width, height, radius]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        await canvs.drawImage(
            path,
            x,
            y, 
            width ?? undefined,
            height ?? undefined,
            radius && radius.length === 1 ? radius[0] : radius
        );
        
        return this.success();
    }
});