import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { WidthOrHeight } from "../classes";
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
    enum: typeof WidthOrHeight;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=imageSize.d.ts.map