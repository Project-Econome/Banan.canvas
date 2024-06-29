import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder } from "../classes";

export default new NativeFunction({
    name: "$canvasTrim",
    version: "1.0.0",
    description: "Trim a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to trim.",
            rest: false,
            type: ArgType.String,
            required: true
        }
    ],
    execute(ctx, [canvas]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        canvs.trim();
        return this.success();
    }
});