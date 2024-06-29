import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { GetOrSet } from "../classes";
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
    type: ArgType.Number;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=opacity.d.ts.map