import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, GetOrSet } from "../classes";

export default new NativeFunction({
    name: "$shadow",
    version: "1.0.0",
    description: "Sets shadow in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to set shadow in.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "color",
            description: "The shadow color",
            rest: false,
            type: ArgType.Color,
            required: false
        },
        {
            name: "blur",
            description: "The shadow blur size.",
            rest: false,
            type: ArgType.Number,
            required: false
        },
        {
            name: "offset",
            description: "The shadow blur size.",
            rest: false,
            type: ArgType.Json,
            required: false
        }
    ],
    execute(ctx, [canvas, color, blur, offset]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);
        if (offset && !Array.isArray(offset))
            return this.customError("Offset field is not an array.");

        canvs.setShadow(blur ?? 0, color ?? 0x000000, offset ?? undefined);
        return this.success();
    }
});