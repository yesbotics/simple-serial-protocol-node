import {ParamType} from "./ParamType";

export class ParamTypeFloat implements ParamType {

    static NAME: string = "float";

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
        return this.rawData.readFloatLE(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
