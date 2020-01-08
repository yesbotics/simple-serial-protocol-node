import {ParamType} from "./types/ParamType";
import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";

export class ParamsParser {

    private static TYPES: Map<string, any> = new Map();

    private readonly typeNames: string[];
    private readonly typesLength: number;
    private types: ParamType<any>[];
    private typeIndex: number;
    private currentType: ParamType<any>;

    constructor(typeNames: string[] = null) {
        this.typeNames = typeNames;
        this.typesLength = typeNames ? typeNames.length : null;
        this.init();
    }

    static hasType(name: string): any {
        return this.TYPES.has(name);
    }

    static getType(name: string): any {
        return this.TYPES.get(name);
    }

    static addType(name: string, clazz: any): any {
        return this.TYPES.set(name, clazz);
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
                throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_PARSER_TOO_MANY_BYTES, "Tried to add byte to param parser but all types filled.");
            }

            this.currentType = this.types[this.typeIndex];
        }
        this.currentType.addByte(byte);
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
