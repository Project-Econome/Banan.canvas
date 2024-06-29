import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder, WidthOrHeight } from "../classes";
import { loadImage } from "@napi-rs/canvas";

export default new NativeFunction({
    name: "$imageSize",
    version: "1.0.0",
    description: "Returns image size.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "path",
            description: "The image path.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "property",
            description: "Image size property.",
            rest: false,
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false
        }
    ],
    async execute(ctx, [path, property]) {
        const image = await loadImage(path);
        return this.success(property 
            ? image[WidthOrHeight[property] as "width" | "height"]
            : JSON.stringify({
                width: image.width,
                height: image.height
            })
        );
    }
});