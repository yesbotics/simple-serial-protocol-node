import {ParamType} from "./ParamType";

export class ParamTypeBoolean implements ParamType<boolean> {

    static readonly NAME: string = "boolean";

    protected rawData = Buffer.allocUnsafe(1);
    protected index: number;

    getLength(): number {
        return 1;
    }

    getBuffer(data: boolean): Buffer {
        const buffer = Buffer.allocUnsafe(1);
        buffer.writeIntLE(data ? 1 : 0, 0, 1);
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

    getData(): boolean {
        return this.rawData.readInt8(0) === 1;
    }

    dispose(): void {
        this.rawData = null;
    }

}
