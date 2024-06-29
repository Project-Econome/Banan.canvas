import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, textAlign } from "../classes";

export default new NativeFunction({
    name: "$alignText",
    version: "0.2.0",
    description: "Sets text align in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to set text align in.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "align",
            description: "Text align.",
            rest: false,
            type: ArgType.Enum,
            enum: textAlign,
            required: true
        }
    ],
    execute(ctx, [canvas, align]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        canvs.setTextAlign(align);
        return this.success();
    }
});