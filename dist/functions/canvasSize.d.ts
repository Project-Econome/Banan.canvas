import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { GetOrSet, WidthOrHeight } from "../classes";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof GetOrSet;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof WidthOrHeight;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Number;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=canvasSize.d.ts.map