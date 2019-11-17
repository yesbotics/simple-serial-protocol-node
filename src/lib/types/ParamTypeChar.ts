import {ParamType} from "./ParamType";

export class ParamTypeChar implements ParamType {

    static readonly NAME: string = "char";

    private rawData: string = "";
    private full: boolean = false;

    static getBuffer(data: string): Buffer {
        return Buffer.from(data);
    }

    reset() {
        this.full = false;
        this.rawData = "";
    }

    addByte(byte: number): void {
        if (this.isFull()) {
            throw new Error("Added byte to already filled  param var.");
        }
        this.full = true;
        this.rawData = String.fromCharCode(byte);
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
