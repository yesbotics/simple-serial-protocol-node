import {ParamType} from "./param-type";

export class ParamTypeString implements ParamType {
    getName(): string {
        return 'string';
    }
}
