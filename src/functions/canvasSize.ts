import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, GetOrSet, WidthOrHeight } from "../classes";

export default new NativeFunction({
    name: "$canvasSize",
    version: "1.0.0",
    description: "Get or set the canvas size.",
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
            description: "Method. (get/set)",
            rest: false,
            type: ArgType.Enum,
            enum: GetOrSet,
            required: true
        },
        {
            name: "property",
            description: "Canvas size property.",
            rest: false,
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false
        },
        {
            name: "value",
            description: "New value.",
            rest: false,
            type: ArgType.Number,
            required: false
        }
    ],
    execute(ctx, [canvas, method, property, value]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const ccanvas = canvs.getContext().canvas;

        if (method === GetOrSet.get)
            return this.success(property 
                ? ccanvas[WidthOrHeight[property] as "width" | "height"]
                : JSON.stringify({ width: ccanvas.width, height: ccanvas.height })
            );
        
        if (property === null) 
            return this.customError("No property provided.");
        if (!value)
            return this.customError("No new value provided.");

        canvs.resize(
            (property as number === 0 ? value : ccanvas.width),
            (property as number === 1 ? value : ccanvas.height)
        );
        return this.success();
    }
});