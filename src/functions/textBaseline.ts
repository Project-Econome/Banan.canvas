import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, textAlign, textBaseline } from "../classes";

export default new NativeFunction({
    name: "$textBaseline",
    version: "1.0.0",
    description: "Sets text baseline in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to set text baseline in.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "baseline",
            description: "Text baseline.",
            rest: false,
            type: ArgType.Enum,
            enum: textBaseline,
            required: true
        }
    ],
    execute(ctx, [canvas, baseline]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        canvs.setTextBaseline(baseline);
        return this.success();
    }
});