export declare class CommandMessage {
    private _raw;
    private _values;
    constructor(raw: string);
    readonly length: number;
    getMessageString(): string;
    getStringValueAt(index: number): string;
    getIntValueAt(index: number): number;
    getFloatValueAt(index: number): number;
    getBooleanValueAt(index: number): boolean;
}
