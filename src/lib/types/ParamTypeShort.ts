import {ParamType} from "./ParamType";

export class ParamTypeShort implements ParamType<number> {

    static NAME: string = "short";

    protected rawData = Buffer.allocUnsafe(2);
    protected index: number;

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(2);
        buffer.writeInt16LE(data, 0);
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
        return this.index > 1;
    }

    getData(): number {
        return this.rawData.readInt16LE(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
