import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { CanvasBuilder, CanvasUtil, MeasureTextProperty } from "../classes"

export default new NativeFunction({
    name: "$measureText",
    version: "1.0.0",
    description: "Measure text.",
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
            description: "The text to measure.",
            rest: false,
            type: ArgType.String,
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
            name: "property",
            description: "The result's property to return.",
            rest: false,
            type: ArgType.Enum,
            enum: MeasureTextProperty,
            required: false
        }
    ],
    execute(ctx, [canvas, text, font, property]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const result = canvs.measureText(text, font) as Record<string, any>;
        return this.success(property ? result[MeasureTextProperty[property]] : JSON.stringify(result));
    }
});