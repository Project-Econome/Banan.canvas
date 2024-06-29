"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    execute(ctx, [split]) {
        return this.success(canvas_1.GlobalFonts.families.map(x => x.family).join(split ?? ", "));
    }
});
//# sourceMappingURL=fontFamilies.js.map