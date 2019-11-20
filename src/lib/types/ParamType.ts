export interface ParamType<T> {

    reset();

    addByte(byte: number): void;

    isFull(): boolean;

    getData(): any;

    dispose(): void;

    getBuffer(data: T): Buffer;
}
