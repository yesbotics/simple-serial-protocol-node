import {ParamType} from "./ParamType";

export class ParamTypeString implements ParamType<string> {

    static readonly NAME: string = "string";

    private static readonly CHAR_NULL: number = 0x00; // 0x00 // End of String

    private rawData: string = "";
    private full: boolean = false;

    getLength(): number {
        return this.rawData.length;
    }

    getBuffer(data: string): Buffer {
        // expand length for end-of-string char
        data += '#';
        const buffer: Buffer = Buffer.from(data, 'ascii');
        buffer[data.length - 1] = ParamTypeString.CHAR_NULL;
        return buffer;
    }

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
        return this.full;
    }

    getData(): string {
        return this.rawData;
    }

    dispose(): void {
        this.rawData = null;
    }
}
