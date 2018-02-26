export declare class SimpleSerialProtocol {
    private _serialPort;
    private _portname;
    private _baudrate;
    private _registeredCommandCallbacks;
    private _running;
    private _currentBuffer;
    constructor(portname: any, baudrate?: number);
    start(): Promise<any>;
    dispose(callback?: (error: Error) => void): void;
    readonly isRunning: boolean;
    send(msg: string): SimpleSerialProtocol;
    registerCommand(char: string, callback: Function): SimpleSerialProtocol;
    unregisterCommand(char: string): SimpleSerialProtocol;
    private onData(buf);
}
