"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "property",
            description: "Image size property.",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.WidthOrHeight,
            required: false
        }
    ],
    async execute(ctx, [path, property]) {
        const image = await (0, canvas_1.loadImage)(path);
        return this.success(property
            ? image[classes_1.WidthOrHeight[property]]
            : JSON.stringify({
                width: image.width,
                height: image.height
            }));
    }
});
//# sourceMappingURL=imageSize.js.map