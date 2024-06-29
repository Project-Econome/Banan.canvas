import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { CanvasBuilder, CanvasUtil } from "../classes"

export default new NativeFunction({
    name: "$strokeText",
    version: "0.1.0",
    description: "Draws text stroke in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw text on.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "text",
            description: "The text to draw.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of text.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of text.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "font",
            description: "The text font.",
            rest: false,
            type: ArgType.String,
            check: CanvasUtil.isValidFont,
            required: true
        },
        {
            name: "color",
            description: "The text color.",
            rest: false,
            type: ArgType.Color,
            required: true
        },
        {
            name: "lineWidth",
            description: "The stroke lines width.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "maxWidth",
            description: "The text max width.",
            rest: false,
            type: ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, text, x, y, font, color, lineWidth, maxWidth]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        canvs.strokeText(text, x, y, font, color, lineWidth, maxWidth ?? undefined)
        return this.success();
    },
})