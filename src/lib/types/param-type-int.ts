import {ParamType} from "./param-type";

export class ParamTypeInt implements ParamType {

    static NAME: string = "int";

    protected rawData = Buffer.allocUnsafe(1);
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
        return this.index > 0;
    }

    getData(): number {
        return this.rawData.readInt8(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
