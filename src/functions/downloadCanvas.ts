import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { writeFileSync } from "node:fs";
import { CanvasBuilder } from "../classes";
import { join } from "node:path";

export default new NativeFunction({
    name: "$downloadCanvas",
    version: "2.2.0",
    description: "Download a Canvas.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the canvas",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "path",
            description: "The path of the canvas",
            rest: false,
            type: ArgType.String,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [canvas, path = "{canvas}.png"]) {
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const buffer = canvs.render();

        if (!buffer)
            return this.customError("Something went wrong.");

        writeFileSync(join(process.cwd(), (path ?? "{canvas}.png").replace(/{canvas}/g, canvas)), buffer);
        return this.success();
    }
});