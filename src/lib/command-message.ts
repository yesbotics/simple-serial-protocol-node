export class CommandMessage {
    private _raw: string;
    private _values: Array<string>;

    constructor(raw: string) {
        this._raw = raw;
        let valuesStr: String = raw.substring(1, raw.length - 1);
        this._values = valuesStr.split(';');
    }

    public get length (): number  {
        return this._values.length;
    };

    public getMessageString = (): string => {
        return this._raw;
    };

    public getStringValueAt = (index: number): string => {
        return this._values[index];
    };

    public getIntValueAt = (index: number): number => {
        return parseInt(this._values[index], 10);
    };

    public getFloatValueAt = (index: number): number => {
        return parseFloat(this._values[index]);
    };

    public getBooleanValueAt = (index: number): boolean => {
        return this._values[index] === 'true' || this._values[index] === '1' ? true : false;
    };


}