import {ParamType} from "./ParamType";

export class ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "int8";

    protected rawData: Buffer = Buffer.allocUnsafe(this.getLength());
    protected index: number = 0;

    getLength(): number {
        return 1;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeInt8(data, 0);
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
        return this.index >= this.getLength();
    }

    getData(): number {
        return this.rawData.readInt8(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
