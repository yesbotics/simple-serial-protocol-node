import {ParamType} from "./types/ParamType";
import {ParamTypeInt} from "./types/ParamTypeInt";
import {ParamTypeUnsignedInt} from "./types/ParamTypeUnsignedInt";
import {ParamTypeShort} from "./types/ParamTypeShort";
import {ParamTypeUnsignedShort} from "./types/ParamTypeUnsignedShort";
import {ParamTypeCharArray} from "./types/ParamTypeCharArray";
import {ParamTypeChar} from "./types/ParamTypeChar";
import {ParamTypeLong} from "./types/ParamTypeLong";
import {ParamTypeFloat} from "./types/ParamTypeFloat";
import {ParamTypeUnsignedLong} from "./types/ParamTypeUnsignedLong";
import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";

export class ParamsParser {

    static readonly TYPES: Map<string, any> = new Map<string, any>([
        [ParamTypeChar.NAME, ParamTypeChar],
        [ParamTypeCharArray.NAME, ParamTypeCharArray],
        [ParamTypeFloat.NAME, ParamTypeFloat],
        [ParamTypeInt.NAME, ParamTypeInt],
        [ParamTypeLong.NAME, ParamTypeLong],
        [ParamTypeShort.NAME, ParamTypeShort],
        [ParamTypeUnsignedInt.NAME, ParamTypeUnsignedInt],
        [ParamTypeUnsignedLong.NAME, ParamTypeUnsignedLong],
        [ParamTypeUnsignedShort.NAME, ParamTypeUnsignedShort],
    ]);

    private readonly typeNames: string[];
    private readonly typesLength: number;
    private types: ParamType[];
    private typeIndex: number;
    private currentType: ParamType;

    constructor(typeNames: string[] = null) {
        this.typeNames = typeNames;
        this.typesLength = typeNames ? typeNames.length : null;
        this.init();
    }

    init() {
        if (this.typeNames.length > 0) {
            this.types = [];
            for (const type of this.typeNames) {
                if (ParamsParser.TYPES.has(type)) {
                    const clazz = ParamsParser.TYPES.get(type);
                    this.types.push(new clazz());
                } else {
                    throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_PARAM_TYPE_UNKNOWN);
                }
            }
            this.currentType = this.types[0];
            this.typeIndex = 0;
        }
    }

    addByte(byte: number) {
        if (!this.types) {
            throw new Error("Tried to add byte to params but no types defined.");
        }
        if (this.currentType.isFull()) {
            // console.log("parser - is full", byte);
            this.typeIndex++;
            if (this.typeIndex >= this.typesLength) {
                throw new Error("Tried to add byte to param parser but all types filled.");
            }

            this.currentType = this.types[this.typeIndex];
        }
        this.currentType.addByte(byte);
        // console.log("parser", "is full");
    }

    isFull(): boolean {
        if (this.types) {
            if (this.typeIndex < (this.typesLength - 1)) {
                // console.log("not reached last type");
                /**
                 * Not reached last type
                 */
                return false;
            } else {
                /**
                 * Last type filled?
                 */
                // console.log("last type filled");
                return this.currentType.isFull();
            }
        } else {
            /**
             * No types defined -> always full
             */
            // console.log("no types defined");
            return true;
        }
    }

    reset() {
        if (this.types) {
            for (const type of this.types) {
                type.reset();
            }
        }
        this.typeIndex = 0;
        this.currentType = this.types[0];
    }

    getData() {
        let data: any[] = [];
        for (const type of this.types) {
            data.push(type.getData());
        }
        return data;
    }

    dispose() {
        for (const type of this.types) {
            type.dispose();
        }
    }
}
