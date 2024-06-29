import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, Filter, FilterMethod } from "../classes";

export default new NativeFunction({
    name: "$filter",
    version: "1.0.0",
    description: "Manage canvas filters.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "method",
            description: "Method. (add/set/remove/clear/get/parse)",
            rest: false,
            type: ArgType.Enum,
            enum: FilterMethod,
            required: true
        },
        {
            name: "filter",
            description: "Filter.",
            rest: false,
            type: ArgType.Enum,
            enum: Filter,
            required: false
        },
        {
            name: "value",
            description: "New value",
            rest: false,
            type: ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, method, filter, value]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const result = canvs.filter(method, filter ?? undefined, value ?? undefined)
        return this.success(
            method === FilterMethod.get
                ? result
                : (method === FilterMethod.parse
                    ? JSON.stringify(result)
                    : undefined
                )
        );
    }
});