/// <reference types="node" />
import { SKRSContext2D, Image } from "@napi-rs/canvas";
import { CanvasUtil } from "./util";
export declare enum GetOrSet {
    get = 0,
    set = 1
}
export declare enum WidthOrHeight {
    width = 0,
    height = 1
}
export declare enum FilterMethod {
    add = 0,
    set = 1,
    remove = 2,
    clear = 3,
    get = 4,
    parse = 5
}
export declare enum Filter {
    none = 0,
    blur = 1,
    sepia = 2,
    grayscale = 3,
    brightness = 4,
    contrast = 5,
    invert = 6,
    saturate = 7
}
export declare enum textAlign {
    start = "end",
    left = "right",
    center = "center",
    right = "left",
    end = "start"
}
export declare enum textBaseline {
    alphabetic = 0,
    bottom = 1,
    hanging = 2,
    ideographic = 3,
    middle = 4,
    top = 5
}
export declare enum MeasureTextProperty {
    actualBoundingBoxAscent = 0,
    actualBoundingBoxDescent = 1,
    actualBoundingBoxLeft = 2,
    actualBoundingBoxRight = 3,
    fontBoundingBoxAscent = 4,
    fontBoundingBoxDescent = 5,
    alphabeticBaseline = 6,
    emHeightAscent = 7,
    emHeightDescent = 8,
    width = 9
}
export declare class CanvasBuilder {
    static ctx: SKRSContext2D;
    static util: typeof CanvasUtil;
    constructor(width?: number, height?: number);
    fillRect: (color: number, x: number, y: number, width: number, height: number, radius?: number | number[]) => typeof CanvasBuilder;
    strokeRect: (color: number, x: number, y: number, width: number, height: number, lineWidth?: number, radius?: number | number[]) => typeof CanvasBuilder;
    clearRect: (x: number, y: number, width?: number, height?: number, radius?: number | number[]) => typeof CanvasBuilder;
    drawImage: (image: string | Buffer | Uint8Array | Image | ArrayBufferLike, x: number, y: number, width?: number, height?: number, radius?: number | number[]) => Promise<typeof CanvasBuilder>;
    fillText: (text: string, x: number, y: number, font: string, color: number, maxWidth?: number) => typeof CanvasBuilder;
    strokeText: (text: string, x: number, y: number, font: string, color: number, lineWidth?: number, maxWidth?: number) => typeof CanvasBuilder;
    opacity: (method: GetOrSet, value?: number) => number | typeof CanvasBuilder;
    filter: (method: FilterMethod, filter?: Filter, value?: number) => string | {
        filter: string;
        value: string;
        raw: string;
    }[] | typeof CanvasBuilder | undefined;
    setShadow: (blur: number, color: number, offset?: number | number[]) => typeof CanvasBuilder;
    trim: () => typeof CanvasBuilder;
    setTextAlign: (align: textAlign) => typeof CanvasBuilder;
    setTextBaseline: (baseline: textBaseline) => typeof CanvasBuilder;
    measureText: (text: string, font: string) => TextMetrics | undefined;
    rotate: (angle: number) => typeof CanvasBuilder;
    resize: (width: number, height: number) => typeof CanvasBuilder;
    getContext: () => SKRSContext2D;
    render: () => Buffer;
}
//# sourceMappingURL=builder.d.ts.map