import {ParamType} from "./types/param-type";

export class CommandCallback {

    paramBufferLength: number = 0;

    constructor(
        public command: string,
        public callback: (...args: any[]) => void,
        public paramTypes: string[] = null
    ) {
        /**
         * Calculate buffer length
         */
        for (const paramType of paramTypes) {
            switch (paramType) {
                case ParamType.PARAM_UINT:
                case ParamType.PARAM_INT:
                    this.paramBufferLength += 1;
                    break;
                case ParamType.PARAM_SHORT:
                case ParamType.PARAM_UNSIGNED_SHORT:
                    this.paramBufferLength += 2;
                    break;
                case ParamType.PARAM_UNSIGNED_FLOAT:
                case ParamType.PARAM_FLOAT:
                    this.paramBufferLength += 4;
                    break;
            }
        }
    }
}
