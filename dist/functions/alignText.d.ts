import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { textAlign } from "../classes";
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
    enum: typeof textAlign;
    required: true;
}], true>;
export default _default;
//# sourceMappingURL=alignText.d.ts.map