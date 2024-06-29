import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { Filter, FilterMethod } from "../classes";
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
    enum: typeof FilterMethod;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof Filter;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Number;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=filter.d.ts.map