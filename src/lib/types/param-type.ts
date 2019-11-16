export interface ParamType {
    reset();

    addByte(byte: number): void;

    isFull(): boolean;

    getData(): any;

    dispose(): void;
}
