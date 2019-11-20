import {ParamType} from "./ParamType";

export class ParamTypeInt implements ParamType<number> {

    static NAME: string = "int";

    protected rawData = Buffer.allocUnsafe(1);
    protected index: number;

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(1);
        buffer.writeIntLE(data, 0, 1);
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
        return this.index > 0;
    }

    getData(): number {
        return this.rawData.readInt8(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
