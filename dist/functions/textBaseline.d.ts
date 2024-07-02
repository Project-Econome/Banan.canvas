import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { textBaseline } from "../classes";
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
    enum: typeof textBaseline;
    required: true;
}], true>;
export default _default;
//# sourceMappingURL=textBaseline.d.ts.map