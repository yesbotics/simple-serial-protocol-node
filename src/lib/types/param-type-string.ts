import {ParamType} from "./param-type";

export class ParamTypeString implements ParamType {

    static readonly NAME: string = "string";

    private static readonly CHAR_NULL: number = 0x00; // 0x00 // End of String

    private rawData: string = "";
    private full: boolean = false;

    reset() {
        this.full = false;
        this.rawData = "";
    }

    addByte(byte: number): void {
        if (this.isFull()) {
            throw new Error("Added byte to already filled  param var.");
        }
        if (byte === ParamTypeString.CHAR_NULL) {
            this.full = true;
            return;
        }
        this.rawData += String.fromCharCode(byte);
    }

    isFull(): boolean {
        return this.full
    }

    getData(): string {
        return this.rawData;
    }

    dispose(): void {
        this.rawData = null;
    }
}
