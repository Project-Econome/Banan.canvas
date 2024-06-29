"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder = exports.MeasureTextProperty = exports.textAlign = exports.Filter = exports.FilterMethod = exports.WidthOrHeight = exports.GetOrSet = void 0;
const canvas_1 = require("@napi-rs/canvas");
const util_1 = require("./util");
var GetOrSet;
(function (GetOrSet) {
    GetOrSet[GetOrSet["get"] = 0] = "get";
    GetOrSet[GetOrSet["set"] = 1] = "set";
})(GetOrSet || (exports.GetOrSet = GetOrSet = {}));
;
var WidthOrHeight;
(function (WidthOrHeight) {
    WidthOrHeight[WidthOrHeight["width"] = 0] = "width";
    WidthOrHeight[WidthOrHeight["height"] = 1] = "height";
})(WidthOrHeight || (exports.WidthOrHeight = WidthOrHeight = {}));
;
var FilterMethod;
(function (FilterMethod) {
    FilterMethod[FilterMethod["add"] = 0] = "add";
    FilterMethod[FilterMethod["set"] = 1] = "set";
    FilterMethod[FilterMethod["remove"] = 2] = "remove";
    FilterMethod[FilterMethod["clear"] = 3] = "clear";
    FilterMethod[FilterMethod["get"] = 4] = "get";
    FilterMethod[FilterMethod["parse"] = 5] = "parse";
})(FilterMethod || (exports.FilterMethod = FilterMethod = {}));
;
var Filter;
(function (Filter) {
    Filter[Filter["none"] = 0] = "none";
    Filter[Filter["blur"] = 1] = "blur";
    Filter[Filter["sepia"] = 2] = "sepia";
    Filter[Filter["grayscale"] = 3] = "grayscale";
    Filter[Filter["brightness"] = 4] = "brightness";
    Filter[Filter["contrast"] = 5] = "contrast";
    Filter[Filter["invert"] = 6] = "invert";
    Filter[Filter["saturate"] = 7] = "saturate";
})(Filter || (exports.Filter = Filter = {}));
;
var textAlign;
(function (textAlign) {
    textAlign[textAlign["start"] = 0] = "start";
    textAlign[textAlign["right"] = 1] = "right";
    textAlign[textAlign["center"] = 2] = "center";
    textAlign[textAlign["left"] = 3] = "left";
    textAlign[textAlign["end"] = 4] = "end";
})(textAlign || (exports.textAlign = textAlign = {}));
;
var MeasureTextProperty;
(function (MeasureTextProperty) {
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxAscent"] = 0] = "actualBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxDescent"] = 1] = "actualBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxLeft"] = 2] = "actualBoundingBoxLeft";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxRight"] = 3] = "actualBoundingBoxRight";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxAscent"] = 4] = "fontBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxDescent"] = 5] = "fontBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["alphabeticBaseline"] = 6] = "alphabeticBaseline";
    MeasureTextProperty[MeasureTextProperty["emHeightAscent"] = 7] = "emHeightAscent";
    MeasureTextProperty[MeasureTextProperty["emHeightDescent"] = 8] = "emHeightDescent";
    MeasureTextProperty[MeasureTextProperty["width"] = 9] = "width";
})(MeasureTextProperty || (exports.MeasureTextProperty = MeasureTextProperty = {}));
;
class CanvasBuilder {
    static ctx;
    static util = util_1.CanvasUtil;
    constructor(width, height) {
        CanvasBuilder.ctx = (0, canvas_1.createCanvas)(width ?? 512, height ?? 512).getContext("2d");
    }
    ;
    fillRect = (color, x, y, width, height, radius) => {
        const ctx = CanvasBuilder.ctx, oldstyle = ctx.fillStyle;
        ctx.fillStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = oldstyle;
        return CanvasBuilder;
    };
    strokeRect = (color, x, y, width, height, lineWidth, radius) => {
        const ctx = CanvasBuilder.ctx, oldstyle = ctx.strokeStyle, oldwidth = ctx.lineWidth;
        ctx.strokeStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.lineWidth = lineWidth ?? 1;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = oldstyle;
        ctx.lineWidth = oldwidth;
        return CanvasBuilder;
    };
    clearRect = (x, y, width, height, radius) => {
        const ctx = CanvasBuilder.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        if (radius && !Array.isArray(radius) && radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        else if (radius && Array.isArray(radius)) {
            const [lTop = 0, rTop = 0, lBottom = 0, rBottom = 0] = radius;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + lTop, y);
            ctx.arcTo(x + width, y, x + width, y + height, rTop);
            ctx.arcTo(x + width, y + height, x, y + height, rBottom);
            ctx.arcTo(x, y + height, x, y, lBottom);
            ctx.arcTo(x, y, x + width, y, lTop);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.clearRect(x, y, width, height);
        return CanvasBuilder;
    };
    drawImage = async (image, x, y, width, height, radius) => {
        image = await (0, canvas_1.loadImage)(image);
        width = width ?? image.width;
        height = height ?? image.height;
        const ctx = CanvasBuilder.ctx;
        if (radius && !Array.isArray(radius) && radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        else if (radius && Array.isArray(radius)) {
            const [lTop = 0, rTop = 0, lBottom = 0, rBottom = 0] = radius;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + lTop, y);
            ctx.arcTo(x + width, y, x + width, y + height, rTop);
            ctx.arcTo(x + width, y + height, x, y + height, rBottom);
            ctx.arcTo(x, y + height, x, y, lBottom);
            ctx.arcTo(x, y, x + width, y, lTop);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
        return CanvasBuilder;
    };
    fillText = (text, x, y, font, color, maxWidth) => {
        const ctx = CanvasBuilder.ctx;
        if (!util_1.CanvasUtil.isValidFont(font))
            return CanvasBuilder;
        const oldfont = ctx.font, oldstyle = ctx.fillStyle;
        ctx.font = font;
        ctx.fillStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.fillText(text, x, y, maxWidth);
        ctx.font = oldfont;
        ctx.fillStyle = oldstyle;
        return CanvasBuilder;
    };
    strokeText = (text, x, y, font, color, lineWidth, maxWidth) => {
        const ctx = CanvasBuilder.ctx;
        if (!util_1.CanvasUtil.isValidFont(font))
            return CanvasBuilder;
        const oldfont = ctx.font, oldstyle = ctx.fillStyle, oldwidth = ctx.lineWidth;
        ctx.font = font;
        ctx.strokeStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.lineWidth = lineWidth ?? 1;
        ctx.strokeText(text, x, y, maxWidth ?? undefined);
        ctx.font = oldfont;
        ctx.strokeStyle = oldstyle;
        ctx.lineWidth = oldwidth;
        return CanvasBuilder;
    };
    opacity = (method, value) => {
        const ctx = CanvasBuilder.ctx;
        if (method == GetOrSet.get)
            return Math.round(ctx.globalAlpha * 100);
        ctx.globalAlpha = value ? value / 100 : 1;
        return CanvasBuilder;
    };
    filter = (method, filter, value) => {
        const ctx = CanvasBuilder.ctx;
        if (method === FilterMethod.add) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === Filter.grayscale || filter === Filter.sepia ? "%" :
                (filter === Filter.blur ? "px" : "");
            ctx.filter = util_1.CanvasUtil.parseFilters((ctx.filter === "none" ? "" : ctx.filter) + `${Filter[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(" ")?.trim();
        }
        else if (method === FilterMethod.set) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === Filter.grayscale || filter === Filter.sepia ? "%" :
                (filter === Filter.blur ? "px" : "");
            ctx.filter = `${Filter[filter]}(${value + PxOrPerc})`;
        }
        else if (method === FilterMethod.remove) {
            if (!filter)
                return;
            let filters = CanvasBuilder.util.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === Filter[filter]);
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(" ")?.trim() : "none";
        }
        else if (method === FilterMethod.clear)
            ctx.filter = "none";
        else if (method === FilterMethod.get)
            return ctx.filter;
        else if (method === FilterMethod.parse)
            return util_1.CanvasUtil.parseFilters(ctx.filter);
        return CanvasBuilder;
    };
    setShadow = (blur, color, offset) => {
        const ctx = CanvasBuilder.ctx;
        ctx.shadowBlur = blur;
        ctx.shadowColor = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ;
        if (offset && !Array.isArray(offset)) {
            ctx.shadowOffsetX = offset;
            ctx.shadowOffsetY = offset;
        }
        else if (offset && Array.isArray(offset)) {
            const [x = 0, y = 0] = offset;
            ctx.shadowOffsetX = x;
            ctx.shadowOffsetY = y;
        }
        ;
        return CanvasBuilder;
    };
    trim = () => {
        let ctx = CanvasBuilder.ctx, canvas = ctx.canvas, pixels = ctx.getImageData(0, 0, canvas.width, canvas.height), l = pixels.data.length, i, bound = {
            top: canvas.height,
            left: canvas.width,
            right: 0,
            bottom: 0
        }, x, y;
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] === 0)
                continue;
            x = (i / 4) % canvas.width;
            y = Math.floor((i / 4) / canvas.width);
            if (x < bound.left)
                bound.left = x;
            if (y < bound.top)
                bound.top = y;
            if (y > bound.bottom)
                bound.bottom = y;
            if (x > bound.right)
                bound.right = x;
        }
        ;
        const height = bound.bottom - bound.top + 1;
        const width = bound.right - bound.left + 1;
        const trimmed = ctx.getImageData(bound.left, bound.top, width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(trimmed, 0, 0);
        return CanvasBuilder;
    };
    setTextAlign = (align) => {
        CanvasBuilder.ctx.textAlign = (textAlign[4 - align] ?? textAlign.left);
        return CanvasBuilder;
    };
    measureText = (text, font) => {
        const ctx = CanvasBuilder.ctx;
        if (!util_1.CanvasUtil.isValidFont(font))
            return;
        const oldcolor = ctx.fillStyle, oldfont = ctx.font;
        ctx.fillStyle = "#000000";
        ctx.font = font;
        const res = ctx.measureText(text);
        ctx.fillStyle = oldcolor;
        ctx.font = oldfont;
        return res;
    };
    rotate = (angle) => {
        const ctx = CanvasBuilder.ctx, cX = ctx.canvas.width / 2, cY = ctx.canvas.height / 2;
        ctx.translate(cX, cY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-cX, -cY);
        return CanvasBuilder;
    };
    resize = (width, height) => {
        const ctx = CanvasBuilder.ctx, data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
        return CanvasBuilder;
    };
    getContext = () => CanvasBuilder.ctx;
    render = () => CanvasBuilder.ctx.canvas.toBuffer("image/png");
}
exports.CanvasBuilder = CanvasBuilder;
;
//# sourceMappingURL=builder.js.map