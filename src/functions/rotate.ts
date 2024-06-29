import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder } from "../classes";

export default new NativeFunction({
    name: "$rotate",
    version: "1.0.0",
    description: "Rotates a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to rotate.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "angle",
            description: "Rotation angle.",
            rest: false,
            type: ArgType.Number,
            required: true
        }
    ],
    execute(ctx, [canvas, angle]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        canvs.rotate(angle);
        return this.success();
    }
});