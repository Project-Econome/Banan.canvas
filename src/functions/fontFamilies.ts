import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { GlobalFonts } from "@napi-rs/canvas";

export default new NativeFunction({
    name: "$fontFamilies",
    version: "1.0.0",
    description: "Returns a list of fonts.",
    unwrap: true,
    brackets: false,
    args: [
        {
            name: "split",
            description: "Fonts separator.",
            rest: false,
            type: ArgType.String,
            required: false
        }
    ],
    execute(ctx, [split]) {
        return this.success(GlobalFonts.families.map(x => x.family).join(split ?? ", "));
    }
});