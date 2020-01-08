export interface ParamType<T> {

    reset();

    addByte(byte: number): void;

    isFull(): boolean;

    getData(): T;

    dispose(): void;

    getBuffer(data: T): Buffer;

    getLength(): number;
}
