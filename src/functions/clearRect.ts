import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$clearRect",
    version: "1.0.0",
    description: "Draws a clear rect in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw a clear rect on.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of rect.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of rect.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "width",
            description: "The rect width.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "height",
            description: "The rect height.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "radius",
            description: "The rect corners radius.",
            rest: true,
            type: ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [name, x, y, width, height, radius]) {
        name = name?.trim();

        const canvas = ctx.getEnvironmentKey(`canvas_${name}`);
        if (!canvas || !(canvas instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${name}'`);

        canvas.clearRect(
            x,
            y,
            width,
            height,
            radius && radius.length === 1 ? radius[0] : radius
        );
        
        return this.success();
    }
});