import {ParamType} from "./ParamType";

export class ParamTypeLong implements ParamType {

    static NAME: string = "long";

    protected rawData = Buffer.allocUnsafe(4);
    protected index: number;

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
