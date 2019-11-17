import {ParamType} from "./ParamType";

export class ParamTypeLong implements ParamType {

    static NAME: string = "long";

    protected rawData = Buffer.allocUnsafe(4);
    protected index: number;

    static getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(4);
        buffer.writeInt32LE(data, 0);
        return buffer;
    }

    reset() {
        this.index = 0;
    }

    addByte(byte: number): void {
        if (this.isFull()) {
            return;
        }
        this.rawData[this.index] = byte;
        this.index++;
    }

    isFull(): boolean {
        return this.index > 3;
    }

    getData(): number {
        return this.rawData.readInt32LE(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
