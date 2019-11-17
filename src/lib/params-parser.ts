import {ParamType} from "./types/param-type";
import {ParamTypeInt} from "./types/param-type-int";
import {ParamTypeCharArray} from "./types/param-type-char-array";
import {ParamTypeUnsignedInt} from "./types/param-type-unsigned-int";
import {ParamTypeShort} from "./types/param-type-short";
import {ParamTypeUnsignedShort} from "./types/param-type-unsigned-short";
import {ParamTypeChar} from "./types/param-type-char";
import {ParamTypeLong} from "./types/param-type-long";
import {ParamTypeUnsignedLong} from "./types/param-type-unsigned-long";
import {ParamTypeFloat} from "./types/param-type-float";

export class ParamsParser {
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
                switch (type) {
                    case ParamTypeInt.NAME:
                        this.types.push(new ParamTypeInt());
                        break;
                    case ParamTypeUnsignedInt.NAME:
                        this.types.push(new ParamTypeUnsignedInt());
                        break;
                    case ParamTypeShort.NAME:
                        this.types.push(new ParamTypeShort());
                        break;
                    case ParamTypeUnsignedShort.NAME:
                        this.types.push(new ParamTypeUnsignedShort());
                        break;
                    case ParamTypeCharArray.NAME:
                        this.types.push(new ParamTypeCharArray());
                        break;
                    case ParamTypeChar.NAME:
                        this.types.push(new ParamTypeChar());
                        break;
                    case ParamTypeFloat.NAME:
                        this.types.push(new ParamTypeFloat());
                        break;
                    case ParamTypeLong.NAME:
                        this.types.push(new ParamTypeLong());
                        break;
                    case ParamTypeUnsignedLong.NAME:
                        this.types.push(new ParamTypeUnsignedLong());
                        break;
                    default:
                        throw new Error("Param type unknown to parser: " + type);
                }
            }
            this.currentType = this.types[0];
            this.typeIndex = 0;
        }
    }

    addByte(byte: number) {
        // console.log("parser - add byte", byte);
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
