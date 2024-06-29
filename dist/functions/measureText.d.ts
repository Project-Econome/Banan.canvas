import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { MeasureTextProperty } from "../classes";
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
    type: ArgType.String;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    check: (font: string) => boolean;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof MeasureTextProperty;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=measureText.d.ts.map