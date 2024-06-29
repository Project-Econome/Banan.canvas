import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, GetOrSet } from "../classes";

export default new NativeFunction({
    name: "$opacity",
    version: "1.0.0",
    description: "Get or set opacity in a canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to get/set opacity in.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "method",
            description: "Method. (get/set)",
            rest: false,
            type: ArgType.Enum,
            enum: GetOrSet,
            required: true
        },
        {
            name: "value",
            description: "New value",
            rest: false,
            type: ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, method, value]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const result = canvs.opacity(method, value ?? undefined);
        return this.success(
            method === GetOrSet.get ?
              result :
              undefined
        );
    }
});