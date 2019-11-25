import {ParamType} from "./ParamType";

export class ParamTypeCharArray implements ParamType<string> {

    static readonly NAME: string = "char_array";

    private static readonly CHAR_NULL: number = 0x00; // 0x00 // End of String

    private rawData: string = "";
    private full: boolean = false;

    getBuffer(data: string): Buffer {
        //expand length for last signt
        data += '#';
        const buffer: Buffer = Buffer.from(data, 'ascii');
        buffer[data.length - 1] = ParamTypeCharArray.CHAR_NULL;
        console.log('buffer', buffer);
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
        if (byte === ParamTypeCharArray.CHAR_NULL) {
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
