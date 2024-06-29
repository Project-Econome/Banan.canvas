import { SKRSContext2D, createCanvas, loadImage, Image } from "@napi-rs/canvas";
import { CanvasUtil } from "./util";

export enum GetOrSet { get, set };
export enum WidthOrHeight { width, height };
export enum FilterMethod { add, set, remove, clear, get, parse };
export enum Filter { none, blur, sepia, grayscale, brightness, contrast, invert, saturate };
export enum textAlign { start, right, center, left, end };
export enum MeasureTextProperty {
  actualBoundingBoxAscent,
  actualBoundingBoxDescent,
  actualBoundingBoxLeft, 
  actualBoundingBoxRight,
  fontBoundingBoxAscent, 
  fontBoundingBoxDescent,
  alphabeticBaseline,
  emHeightAscent,
  emHeightDescent,
  width
};

export class CanvasBuilder {
  public static ctx: SKRSContext2D;
  public static util = CanvasUtil;

  public constructor(width?: number, height?: number) {
    CanvasBuilder.ctx = createCanvas(width ?? 512, height ?? 512).getContext("2d");
  };

  public fillRect = (color: number, x: number, y: number, width: number, height: number, radius?: number | number[]) => {
    const ctx = CanvasBuilder.ctx,
          oldstyle = ctx.fillStyle;

    ctx.fillStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;

    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = oldstyle;
    
    return CanvasBuilder;
  };

  public strokeRect = (color: number, x: number, y: number, width: number, height: number, lineWidth?: number, radius?: number | number[]) => {
    const ctx = CanvasBuilder.ctx,
          oldstyle = ctx.strokeStyle,
          oldwidth = ctx.lineWidth;
  
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

  public clearRect = (x: number, y: number, width?: number, height?: number, radius?: number | number[]) => {
    const ctx = CanvasBuilder.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
   
    if (radius && !Array.isArray(radius) && radius > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      
      ctx.arcTo(x + width, y, x + width, y + height, radius)
      ctx.arcTo(x + width, y + height, x, y + height, radius)
      ctx.arcTo(x, y + height, x, y, radius)
      ctx.arcTo(x, y, x + width, y, radius)
      
      ctx.closePath()
      ctx.clip()
    } else if (radius && Array.isArray(radius)) {
      const [ lTop = 0, rTop = 0, lBottom = 0, rBottom = 0 ] = radius;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + lTop, y);

      ctx.arcTo(x + width, y, x + width, y + height, rTop);
      ctx.arcTo(x + width, y + height, x, y + height, rBottom);
      ctx.arcTo(x, y + height, x, y, lBottom);
      ctx.arcTo(x, y, x + width, y, lTop);

      ctx.closePath();
      ctx.clip();
    };
    ctx.clearRect(x, y, width, height)

    return CanvasBuilder;
  };

  public drawImage = async (image: string | Buffer | Uint8Array | Image | ArrayBufferLike, x: number, y: number, width?: number, height?: number, radius?: number | number[]) => {
    image = await loadImage(image);
    width = width ?? image.width as number;
    height = height ?? image.height as number;
    
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
    } else if (radius && Array.isArray(radius)) {
      const [ lTop = 0, rTop = 0, lBottom = 0, rBottom = 0 ] = radius;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + lTop, y);

      ctx.arcTo(x + width, y, x + width, y + height, rTop);
      ctx.arcTo(x + width, y + height, x, y + height, rBottom);
      ctx.arcTo(x, y + height, x, y, lBottom);
      ctx.arcTo(x, y, x + width, y, lTop);
  
      ctx.closePath();
      ctx.clip();
    };
    ctx.drawImage(image, x, y, width, height);
    ctx.restore();
  
    return CanvasBuilder;
  };

  public fillText = (text: string, x: number, y: number, font: string, color: number, maxWidth?: number) => {
    const ctx = CanvasBuilder.ctx;
    if (!CanvasUtil.isValidFont(font))
      return CanvasBuilder;

    const oldfont = ctx.font,
          oldstyle = ctx.fillStyle;
    
    ctx.font = font;
    ctx.fillStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;

    ctx.fillText(text, x, y, maxWidth);
    
    ctx.font = oldfont;
    ctx.fillStyle = oldstyle;

    return CanvasBuilder;
  };

  public strokeText = (text: string, x: number, y: number, font: string, color: number, lineWidth?: number, maxWidth?: number) => {
    const ctx = CanvasBuilder.ctx;
    if (!CanvasUtil.isValidFont(font))
      return CanvasBuilder;

    const oldfont = ctx.font,
          oldstyle = ctx.fillStyle,
          oldwidth = ctx.lineWidth;
    
    ctx.font = font;
    ctx.strokeStyle = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;
    ctx.lineWidth = lineWidth ?? 1;

    ctx.strokeText(text, x, y, maxWidth ?? undefined)
    
    ctx.font = oldfont;
    ctx.strokeStyle = oldstyle;
    ctx.lineWidth = oldwidth;

    return CanvasBuilder;
  };

  public opacity = (method: GetOrSet, value?: number) => {
    const ctx = CanvasBuilder.ctx;
    if (method == GetOrSet.get)
      return Math.round(ctx.globalAlpha * 100);

    ctx.globalAlpha = value ? value / 100 : 1;
    
    return CanvasBuilder;
  };

  public filter = (method: FilterMethod, filter?: Filter, value?: number) => {
    const ctx = CanvasBuilder.ctx;

    if (method === FilterMethod.add) {
      if (!filter || !value) return;

      const PxOrPerc =
          filter === Filter.grayscale || filter === Filter.sepia ? "%" : 
            (filter === Filter.blur ? "px" : "");

      ctx.filter = CanvasUtil.parseFilters((ctx.filter === "none" ? "" : ctx.filter) + `${Filter[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(" ")?.trim()
    }
    else if (method === FilterMethod.set) {
      if (!filter || !value) return;

      const PxOrPerc =
          filter === Filter.grayscale || filter === Filter.sepia ? "%" : 
            (filter === Filter.blur ? "px" : "");

      ctx.filter = `${Filter[filter]}(${value + PxOrPerc})`
    }
    else if (method === FilterMethod.remove) {
      if (!filter) return;

      let filters = CanvasBuilder.util.parseFilters(ctx.filter)

      const index = filters.findIndex((obj: { filter: string, raw: string, value: string }) => obj?.filter === Filter[filter])

      if (index !== -1)
        filters.splice(index, 1);

      ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(" ")?.trim() : "none"
    }
    else if (method === FilterMethod.clear)
      ctx.filter = "none";
    else if (method === FilterMethod.get)
      return ctx.filter;
    else if (method === FilterMethod.parse)
      return CanvasUtil.parseFilters(ctx.filter);

    return CanvasBuilder;
  };

  public setShadow = (blur: number, color: number, offset?: number | number[]) => {
    const ctx = CanvasBuilder.ctx;

    ctx.shadowBlur = blur;
    ctx.shadowColor = `rgb(${color >> 16},${(color >> 8) & 0xFF},${color & 0xFF})`;;
    
    if (offset && !Array.isArray(offset)) {
      ctx.shadowOffsetX = offset;
      ctx.shadowOffsetY = offset;
    } else if (offset && Array.isArray(offset)) {
      const [ x = 0, y = 0 ] = offset;

      ctx.shadowOffsetX = x;
      ctx.shadowOffsetY = y;
    };
    
    return CanvasBuilder;
  };

  public trim = () => {
    let ctx = CanvasBuilder.ctx,
        canvas = ctx.canvas,
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
        l = pixels.data.length,
        i,
        bound = {
            top: canvas.height,
            left: canvas.width,
            right: 0,
            bottom: 0
        },
        x, y;

    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] === 0)
            continue;

        x = (i / 4) % canvas.width;
        y = Math.floor((i / 4) / canvas.width);

        if (x < bound.left) bound.left = x;
        if (y < bound.top) bound.top = y;
        if (y > bound.bottom) bound.bottom = y;
        if (x > bound.right) bound.right = x;
    };

    const height = bound.bottom - bound.top + 1;
    const width = bound.right - bound.left + 1;
    const trimmed = ctx.getImageData(bound.left, bound.top, width, height);

    canvas.width = width;
    canvas.height = height;

    ctx.putImageData(trimmed, 0, 0);
    return CanvasBuilder;
  };

  public setTextAlign = (align: textAlign) => {
    CanvasBuilder.ctx.textAlign = (textAlign[4 - align] ?? textAlign.left) as CanvasTextAlign;

    return CanvasBuilder;
  };

  public measureText = (text: string, font: string) => {
    const ctx = CanvasBuilder.ctx;
    if (!CanvasUtil.isValidFont(font))
      return;

    const oldcolor = ctx.fillStyle,
          oldfont = ctx.font;
    
    ctx.fillStyle = "#000000";
    ctx.font = font;
    
    const res = ctx.measureText(text);

    ctx.fillStyle = oldcolor;
    ctx.font = oldfont;

    return res;
  };

  public rotate = (angle: number) => {
    const ctx = CanvasBuilder.ctx,
          cX = ctx.canvas.width / 2,
          cY = ctx.canvas.height / 2;

    ctx.translate(cX, cY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-cX, -cY);

    return CanvasBuilder;
  };

  public resize = (width: number, height: number) => {
    const ctx = CanvasBuilder.ctx,
          data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.putImageData(data, 0, 0);

    return CanvasBuilder;
  };

  public getContext = () => CanvasBuilder.ctx;
  public render = () => CanvasBuilder.ctx.canvas.toBuffer("image/png");
};